import supertest from "supertest";
import { test, after, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import app from "../app.js";

const api = supertest(app);

describe("in the DB: ", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("four notes exist", async () => {
    const res = api.get("/api/notes");
    assert.strictEqual((await res).body.length, 4);
  });

  test("the first note is about HTTP methods", async () => {
    const res = await api.get("/api/notes");
    const noteContents = res.body.map((e) => e.content);
    assert.strictEqual(noteContents.includes("HTML is easy"), true);
  });
});

after(async () => {
  await mongoose.connection.close();
});
