import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

const blogRouter = express.Router();

// handle authorization and token
const getUserToken = (req) => {
  const auth = req.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "");
    return token;
  }
  logger.error("Authorization header missing or invalid!");
  return null;
};

// home page
blogRouter.get("/home", (req, res) => {
  res.send(`
    <h1>Welcome to my blog!</h1>
    `);
});

// GET
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
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
  const { title, url, content, likes } = req.body;
  logger.info("POST req.body: ", title, content);

  if (!title || !url || !content) {
    return res.status(400).json({ error: "title, author, and URL are required." });
  }

  const decodedToken = jwt.verify(getUserToken(req), process.env.JWT_SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Invalid authentication token!" });
  }

  const user = await User.findById(decodedToken.id);
  logger.info(user);

  // extract token & auth
  const token = getUserToken(req);
  if (!token) return res.status(401).json({ error: "Authorization header missing or invalid!" });

  const newBlogPost = new Blog({
    title,
    author: user.username,
    url,
    content,
    likes: likes || 0,
    user: user.id
  });

  const savedBlog = await newBlogPost.save();
  user.blogs = user.blogs || [];
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
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
