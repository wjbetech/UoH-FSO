import supertest from "supertest";
import { test, after, describe, beforeEach } from "node:test";
import Note from "../models/note.js";
import assert from "node:assert";
import mongoose from "mongoose";
import app from "../app.js";

const api = supertest(app);

const initialNotes = [
  {
    content: "HTML is easy",
    important: false
  },
  {
    content: "Browser can only execute JavaScript",
    important: true
  }
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

describe("in the DB: ", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("list has length equal to res obj body.length", async () => {
    const res = await api.get("/api/notes");
    assert.strictEqual(res.body.length, initialNotes.length);
  });

  test("the first note is about HTTP methods", async () => {
    const res = await api.get("/api/notes");
    const noteContents = res.body.map((e) => e.content);
    assert(noteContents.includes("HTML is easy"));
  });

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

    const res = await api.get("/api/notes");
    const contents = res.body.map((c) => c.content);
    assert.strictEqual(res.body.length, initialNotes.length + 1);
    assert(contents.includes("async/await syntax simplifies async operations"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
