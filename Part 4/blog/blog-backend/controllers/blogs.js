import express from "express";
import Blog from "../models/blog.js";
import logger from "../utils/logger.js";

const blogRouter = express.Router();

// home page
blogRouter.get("/home", (req, res) => {
  res.send(`
    <h1>Welcome to my blog!</h1>
    `);
});

// GET

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  logger.info("Finding blog at ID: ", req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: "Blog post not found." }).end();
  }
});

// POST, PUT, DELETE
blogRouter.post("/", async (req, res) => {
  logger.info("POST request body: ", req.body);
  const { title, author, url, content, likes, userId } = req.body;
  const connectedUser = await User.findById(userId);

  if (!title || !author || !url || !content) {
    return res.status(400).json({ error: "title, author, and URL are required." });
  }

  const newBlogPost = new Blog({
    title,
    author,
    url,
    content,
    likes: likes || 0,
    user: connectedUser.id
  });

  const savedBlogPost = await newBlogPost.save();
  connectedUser.blogs = connectedUser.blogs.concat(savedBlogPost._id);
  res.status(201).json(savedBlogPost);
});

blogRouter.put("/:id", async (req, res) => {
  const { title, author, url, content, likes } = req.body;

  const blog = {
    title: title,
    author: author,
    url: url,
    content: content,
    likes: likes || 0
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(updatedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default blogRouter;
