import supertest from "supertest";
import { test, after, describe, beforeEach } from "node:test";
import app from "../app.js";
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

describe("in the blog DB: ", () => {
  describe("fundamental DB properties: ", () => {
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

  describe("route properties: ", () => {
    test("id passed via params is same as mongodb _id", async () => {
      const blogs = await helper.getBlogsInDb();
      const blogToView = blogs[0];
      const resultBlog = await api.get(`/api/blogs/${blogToView.id}`);

      assert.strictEqual(resultBlog.body.id, blogToView.id.toString());
    });
  });

  describe("HTTP POST requests: ", () => {
    test("POST requests add a new blog to the DB", async () => {
      const newBlog = {
        title: "New Blog Post",
        author: "wjbetech",
        content: "Third blog post for testing purposes! Deleting soon",
        url: "www.wjbeblog.com",
        likes: 0
      };

      // attempt login to get the token
      const loginResponse = await api
        .post("/api/login")
        .send({ username: "testUser", password: "password" })
        .expect(200);

      // extract token after logging in
      const token = loginResponse.body.token; // Assuming the token is returned in the response body

      // pass token into blog POST req
      const blogResponse = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`) // Set the token in the Authorization header
        .send(newBlog)
        .expect(201);

      // verify DB updates with new blog
      const updatedBlogs = await helper.getBlogsInDb();
      assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1);
    });

    test("POST requests must be sent with a token", async () => {
      const newBlog = {
        title: "New Blog Post",
        author: "wjbetech",
        content: "Third blog post for testing purposes! Deleting soon",
        url: "www.wjbeblog.com",
        likes: 0
      };

      // attempt login to get the token
      const loginResponse = await api
        .post("/api/login")
        .send({ username: "testUser", password: "password" })
        .expect(200);

      // pass token into blog POST req
      const blogResponse = await api.post("/api/blogs").send(newBlog).expect(401);

      // verify DB updates with new blog
      const updatedBlogs = await helper.getBlogsInDb();
      assert.strictEqual(updatedBlogs.length, initialBlogs.length);
    });
  });

  describe("req.body validation: ", () => {
    test("if req.body.likes == 0, defaults to 0", async () => {
      const newBlog = {
        title: "New Blog Post",
        author: "wjbetech",
        content: "Third blog post for testing purposes! Deleting soon",
        url: "www.wjbeblog.com"
      };

      // attempt login to get the token
      const loginResponse = await api
        .post("/api/login")
        .send({ username: "testUser", password: "password" })
        .expect(200);

      // extract token after logging in
      const token = loginResponse.body.token;

      const blogResponse = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`) // Set the token in the Authorization header
        .send(newBlog)
        .expect(201);

      const updatedBlogs = await helper.getBlogsInDb();
      const blogToView = updatedBlogs[updatedBlogs.length - 1];
      assert.strictEqual(blogToView.likes, 0);
    });

    test("if req.body misses title or url props, return status 400", async () => {
      // attempt login to get the token
      const loginResponse = await api
        .post("/api/login")
        .send({ username: "testUser", password: "password" })
        .expect(200);

      // extract token after logging in
      const token = loginResponse.body.token;

      const newBlog = {
        author: "wjbetech",
        content: "Third blog post for testing purposes! Deleting soon"
      };

      await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);
    });
  });

  describe("HTTP DELETE requests: ", () => {
    test("single blog resource can be deleted", async () => {
      const originalBlogs = await helper.getBlogsInDb();

      // attempt login to get the token
      const loginResponse = await api
        .post("/api/login")
        .send({ username: "testUser", password: "password" })
        .expect(200);

      // extract token after logging in
      const token = loginResponse.body.token;

      const newBlog = {
        title: "New Blog Post",
        author: "wjbetech",
        content: "Third blog post for testing purposes! Deleting soon",
        url: "www.wjbeblog.com"
      };

      const blogResponse = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`) // Set the token in the Authorization header
        .send(newBlog)
        .expect(201);

      const updatedBlogList = await helper.getBlogsInDb();
      const blogToDelete = updatedBlogList[updatedBlogList.length - 1];

      await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `Bearer ${token}`).expect(204);

      const updatedBlogs = await helper.getBlogsInDb();
      const blogContents = updatedBlogs.map((b) => b.content);
      assert(!blogContents.includes(blogToDelete.content));
      assert.strictEqual(updatedBlogs.length, originalBlogs.length);
    });
  });

  describe("HTTP PUT requests: ", () => {
    test("single blog resource can be updated", async () => {
      const blogs = await helper.getBlogsInDb();
      const blogToUpdate = blogs[0];
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 2 };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

      const updatedBlogs = await helper.getBlogsInDb();
      const blogToView = updatedBlogs.find((b) => b.id === blogToUpdate.id);
      assert.strictEqual(blogToView.likes, updatedBlog.likes);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
