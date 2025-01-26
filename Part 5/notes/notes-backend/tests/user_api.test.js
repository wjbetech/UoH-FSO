import { test, after, describe, beforeEach } from "node:test";
import supertest from "supertest";
import User from "../models/user.js";
import assert from "node:assert";
import mongoose from "mongoose";
import app from "../app.js";
import helper from "./test_helper.js";
import bcrypt from "bcrypt";

const api = supertest(app);

describe("Tests for Users & route /controllers/users.js", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secretpw", 10);

    const dummyUser = new User({
      username: "testUser",
      name: "testUser",
      passwordHash
    });

    await dummyUser.save();
  });

  describe("HTTP POST requests: ", () => {
    test("successfully create a fresh user /w username", async () => {
      const initialUsers = await helper.getUsersInDb();

      const newUser = {
        username: "testUser2",
        name: "testUser2",
        password: "testpassword"
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const endUsers = await helper.getUsersInDb();
      assert.strictEqual(endUsers.length, initialUsers.length + 1);

      const usernames = endUsers.map((user) => user.username);
      assert(usernames.includes(newUser.username));
    });

    test("creation fails with proper statuscode and msg if username exists", async () => {
      const initialUsers = await helper.getUsersInDb();

      const newUser = {
        username: "testUser", // same username as existing
        name: "testUser",
        password: "testpassword"
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const endUsers = await helper.getUsersInDb();
      assert(result.body.error.includes("expected `username` to be unique"));
      assert.strictEqual(endUsers.length, initialUsers.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
