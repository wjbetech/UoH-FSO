import express from "express";
import Comment from "../models/comment.js";
import Blog from "../models/blog.js";
import logger from "../utils/logger.js";
import middleware from "../utils/middleware.js";
const { tokenExtractor, userExtractor } = middleware;

const commentRouter = express.Router();

// get all comments for a specific blog as :blogId
commentRouter.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.id }).populate(
      "user",
      { username: 1, name: 1 },
    );

    res.json(comments);
  } catch (error) {
    logger.error("Error fetching comments: ", error);
    res.status(500).json({
      error: "commentRouter.get error - failed to fetch comments",
    });
  }
});

commentRouter.post(
  "/:id/comments",
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const { content } = req.body;
      const user = req.user;
      const blogId = req.params.id;

      if (!content) {
        return res.status(400).json({
          error: "commentRouter.post error - comment content is required!",
        });
      }

      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({
          error: "commentRouter.post error - blog not found!",
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "commentRouter.post error - user not logged in!",
        });
      }

      // build the new comment object
      // - remember the createdAt date is added by default
      const newComment = new Comment({
        content,
        user: user._id,
        blog: blog._id,
      });

      const savedComment = await newComment.save();

      // checking the new saved comment:
      console.log("Saved comment: ", savedComment);

      // add the reference
      blog.comments.push(savedComment._id);
      await blog.save();

      await savedComment.populate("user", { username: 1, name: 1 });

      console.log("Comment successfully created:", savedComment);

      res.status(201).json(savedComment);
    } catch (error) {
      logger.error(
        "commentRouter.post error - error creating comment: " + error,
      );
      res.status(500).json({
        error: "commentRouter.post error - failed to create comment",
      });
    }
  },
);

commentRouter.delete(
  "/:blogId/comments/:id",
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const user = req.user;
      const comment = await Comment.findById(req.params.id);

      // ensure that a comment to delete is found
      if (!comment) {
        return res.status(404).json({
          error: "commentRouter.delete error - no comment found!",
        });
      }

      // ensure that user deleting is the comment creator
      if (comment.user.toString() !== user.id.toString()) {
        return res.status(403).json({
          error: "commentRouter.delete error - Unauthorized to delete comment",
        });
      }

      // remove comment ref from DB
      // - this may be what screwed up the blog post count
      await Blog.findByIdAndUpdate(req.params.blogId, {
        $pull: { comments: comment._id },
      });

      await Comment.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      logger.error(
        "commentRouter.delete error - could not delete comment!",
        error,
      );
      res.status(500).json({
        error: "commentRouter.delete error - failed to delete comment",
      });
    }
  },
);

export default commentRouter;
