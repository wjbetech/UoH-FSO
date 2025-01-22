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

  await Blog.insertMany(helper.initialBlogs)
    .then(() => {
      console.log("Finished purging and re-building blog DB");
    })
    .catch((error) => {
      next(error);
    });
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

  test("id passed via params is same as mongodb _id", async () => {
    const blogs = await helper.getBlogsInDb();
    const blogToView = blogs[0];
    const resultBlog = await api.get(`/api/blogs/${blogToView.id}`);

    assert.strictEqual(resultBlog.body.id, blogToView.id.toString());
  });
});

after(async () => {
  await mongoose.connection.close();
});
