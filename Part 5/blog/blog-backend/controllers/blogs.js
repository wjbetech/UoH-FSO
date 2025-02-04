import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import middleware from "../utils/middleware.js";
const { tokenExtractor, userExtractor } = middleware;

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
blogRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const { title, url, content, likes } = req.body;

  if (!title || !url || !content) {
    return res.status(400).json({ error: "title, author, and URL are required." });
  }

  try {
    // user already passed by userExtractor middleware
    const user = req.user;
    logger.info("Handling POST req from user: " + user.username);

    // verify token
    // const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    // if (!decodedToken.id) {
    //   return res.status(401).json({ error: "Invalid authentication token!" });
    // }

    // build & save our new blog post
    const newBlogPost = new Blog({
      title,
      author: user.username,
      url,
      content,
      likes: likes || 0,
      user: user.id
    });

    const savedBlog = await newBlogPost.save();

    // handle adding savedBlog to connected user
    user.blogs = user.blogs || [];
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    // respond with saved blog post
    res.status(201).json(savedBlog);
  } catch (error) {
    logger.error("Error POSTing new blog post: ", error);
    res.status(500).json({
      error: "Internal server error."
    });
  }
});

blogRouter.put("/:id", tokenExtractor, userExtractor, async (req, res) => {
  const { title, author, url, content, likes } = req.body;

  try {
    const user = req.user;
    logger.info("Handling a POST request from: ", user.username);

    const blog = {
      user,
      title: title,
      author: author,
      url: url,
      content: content,
      likes: likes || 0
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(updatedBlog);
  } catch (error) {}
});

blogRouter.delete("/:id", tokenExtractor, userExtractor, async (req, res) => {
  try {
    const user = req.user;

    logger.info("Handling DELETE request from user: ", user.username);

    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res.status(400).json({
        error: "No blog found."
      });
    }

    if (blogToDelete.user.toString() !== user.id.toString()) {
      return res.status(403).json({
        error: "You are not authorized to delete this blog."
      });
    }

    await Blog.findByIdAndDelete(blogToDelete.id);
    res.status(204).end();
  } catch (error) {
    logger.info("Error deleting blog: ", error);
    res.status(500).json({
      error: "An error occurred while trying to delete blog."
    });
  }
});

export default blogRouter;
