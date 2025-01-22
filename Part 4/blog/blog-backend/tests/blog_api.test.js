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

  test("POST requests add a new blog to the DB", async () => {
    const newBlog = {
      title: "New Blog Post",
      author: "wjbetech",
      content: "Third blog post for testing purposes! Deleting soon",
      url: "www.wjbeblog.com",
      likes: 0
    };

    await api.post("/api/blogs").send(newBlog).expect(201);
    const updatedBlogs = await helper.getBlogsInDb();
    assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1);
  });

  test("if req.body.likes == 0, defaults to 0", async () => {
    const newBlog = {
      title: "New Blog Post",
      author: "wjbetech",
      content: "Third blog post for testing purposes! Deleting soon",
      url: "www.wjbeblog.com"
    };

    await api.post("/api/blogs").send(newBlog);
    const updatedBlogs = await helper.getBlogsInDb();
    const blogToView = updatedBlogs[updatedBlogs.length - 1];
    assert.strictEqual(blogToView.likes, 0);
  });

  test("if req.body misses title or url props, return status 400", async () => {
    const newBlog = {
      author: "wjbetech",
      content: "Third blog post for testing purposes! Deleting soon"
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
