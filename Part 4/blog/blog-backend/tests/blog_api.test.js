import supertest from "supertest";
import app from "../app.js";
import { test, after, describe, beforeEach } from "node:test";
import Blog from "../models/blog.js";
import assert from "node:assert";
import mongoose from "mongoose";
import helper from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Clearing out the DB");

  helper.initialBlogs.forEach(async (blog) => {
    let postObject = new Blog(blog);
    await postObject.save();
    console.log("Saved post!");
  });
  console.log("Finished purging and re-building blog DB");
});

describe("in the blog DB", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("list has length equal to response body.length", async () => {
    const res = await api.get("/api/blogs");
    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
