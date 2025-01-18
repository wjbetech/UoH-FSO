import express from "express";
import Blog from "../models/blog.js";

const blogRouter = express.Router();

// home page
blogRouter.get("/home", (req, res, next) => {
  res.send(`
    <h1>Welcome to my blog!</h1>
    `);
});

// info page
blogRouter.get("/info", (req, res, next) => {
  const currentDateAndTime = new Date();

  Blog.find({})
    .then((blog) => {
      if (blog) {
        res.send(`
        <h3>The blog currently has ${blog.length} blog posts!</h3>
        <p>${currentDateAndTime}</p>
        `);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// GET

// get all blog posts
blogRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((post) => {
      console.log("====================================");
      console.log("Fetching & sending all blog posts...");
      console.log("====================================");
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Could not fetch blog posts!" });
      }
    })
    .catch((error) => {
      next(error);
    });
});

blogRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((post) => {
      if (post) {
        console.log("====================================");
        console.log("Fetching blog post with id: ", req.params.id);
        console.log("====================================");
        res.json(post);
      } else {
        res.status(404).json({ error: "Blog post not found." });
      }
    })
    .catch((error) => next(error));
});

// POST, PUT, DELETE

blogRouter.post("/", (req, res, next) => {
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

  newBlogPost
    .save()
    .then((savedBlogPost) => {
      res.json(savedBlogPost);
      console.log("====================================");
      console.log("New post:", savedBlogPost, "was added successfully!");
      console.log("====================================");
    })
    .catch((error) => {
      next(error);
    });
});

export default blogRouter;
