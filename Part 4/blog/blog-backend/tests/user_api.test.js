import { test, after, describe, beforeEach } from "node:test";
import supertest from "supertest";
import User from "../models/user.js";
import assert from "node:assert";
import mongoose from "mongoose";
import app from "../app.js";
import helper from "./test_helper.js";
import bcrypt from "bcrypt";

const api = supertest(app);

describe("Tests for User & /controllers/users.js routes", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const testUser = new User({ username: "testUser", name: "testUser", passwordHash });
    await testUser.save();
  });

  describe("HTTP POST requests: ", () => {
    test("successfully create a new user", async () => {
      const initialUsers = await helper.getUsersInDb();

      const newUser = {
        username: "testUser2",
        name: "testUser2",
        password: "testPassword"
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

    test("fails to create a new user with existing credentials", async () => {
      const initialUsers = await helper.getUsersInDb();

      const newUser = {
        username: "testUser",
        name: "testUser",
        password: "password"
      };

      const res = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const endUsers = await helper.getUsersInDb();
      assert(res.body.error.includes("expected `username` to be unique"));
      assert.strictEqual(endUsers.length, initialUsers.length);
    });
  });
});

after(async () => {
  // can add this line to 'flush' DB after testing, if desired
  // await User.deleteMany({});
  await mongoose.connection.close();
});
