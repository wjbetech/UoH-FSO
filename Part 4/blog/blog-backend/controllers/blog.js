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

// info page
// blogRouter.get("/info", (req, res, next) => {
//   const currentDateAndTime = new Date();
//
//   Blog.find({})
//     .then((blog) => {
//       if (blog) {
//         res.send(`
//         <h3>The blog currently has ${blog.length} blog posts!</h3>
//         <p>${currentDateAndTime}</p>
//         `);
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// GET

// get all blog posts
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// get specific blog via url id
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
  const { title, author, url, content, likes } = req.body;

  if (!title || !author || !url || !content) {
    return res.status(400).json({ error: "title, author, and URL are required." });
  }

  const newBlogPost = new Blog({
    title,
    author,
    url,
    content,
    likes: likes || 0
  });

  const savedBlogPost = await newBlogPost.save();
  res.status(201).json(savedBlogPost);
});

export default blogRouter;
