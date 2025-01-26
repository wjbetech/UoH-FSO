import { test, after, describe, beforeEach } from "node:test";
import supertest from "supertest";
import Note from "../models/note.js";
import assert from "node:assert";
import mongoose from "mongoose";
import app from "../app.js";
import helper from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
});

describe("tests for MongoDB Notes DB:", async () => {
  describe("checking for fundamental DB properties:", async () => {
    test("notes are returned as json", async () => {
      await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("list has length equal to res obj body.length", async () => {
      const res = await api.get("/api/notes");
      assert.strictEqual(res.body.length, helper.initialNotes.length);
    });

    test("the first note is about HTTP methods", async () => {
      const res = await api.get("/api/notes");
      const noteContents = res.body.map((e) => e.content);
      assert(noteContents.includes("HTML is easy"));
    });
  });

  describe("checking only valid notes can be created:", async () => {
    test("valid notes can be added to DB", async () => {
      const newNote = {
        content: "async/await syntax simplifies async operations",
        important: true
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await helper.getNotesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);
      const contents = notesAtEnd.map((e) => e.content);
      assert(contents.includes("async/await syntax simplifies async operations"));
    });

    test("note without content is not added", async () => {
      const newNote = {
        important: true
      };

      await api.post("/api/notes").send(newNote).expect(400);

      const response = await api.get("/api/notes");

      assert.strictEqual(response.body.length, helper.initialNotes.length);
    });
  });

  describe("checking DB can access notes", async () => {
    test("a specific note can be viewed", async () => {
      const originalNotes = await helper.getNotesInDb();

      const noteToView = originalNotes[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test("a random note can be viewed", async () => {
      const originalNotes = await helper.getNotesInDb();

      const randomNoteIdx = Math.floor(Math.random() * originalNotes.length);
      const noteToView = originalNotes[randomNoteIdx];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });
  });

  describe("checking DB DELETE actions", async () => {
    test("a specific note can be deleted", async () => {
      const originalNotes = await helper.getNotesInDb();
      const noteToDelete = originalNotes[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const updatedNotes = await helper.getNotesInDb();
      const contents = updatedNotes.map((n) => n.content);
      assert(!contents.includes(noteToDelete.content));
      assert.strictEqual(updatedNotes.length, helper.initialNotes.length - 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
