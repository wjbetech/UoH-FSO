import { createSlice } from "@reduxjs/toolkit";
import { notificationThunk } from "./notificationReducer";
import blogService from "../services/blogs.js";
const { update } = blogService;
import { updateBlog } from "./blogReducer";
import commentService from "../services/comments.js";
const { create, remove, setToken } = commentService;
import { useSelector } from "react-redux";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comment: "",
  },

  reducers: {
    appendComment: (state, action) => action.payload,

    removeComment: (state, action) => action.payload,
  },
});

export const { appendComment, removeComment } = commentSlice.actions;

export const addCommentThunk = (blogId, commentData, token) => {
  return async (dispatch, getState) => {
    try {
      commentService.setToken(token);
      const newComment = await commentService.create(blogId, commentData);

      // call getState to get the current blogs
      const { blogs } = getState();
      const blog = blogs.find((b) => b.id === blogId);

      if (!blog) {
        console.error("Blog not found when adding comment");
        return;
      }

      // ensure that you are spreading the prevBlogs to enforce re-rendering
      const updatedBlog = { ...blog, comments: [...blog.comments, newComment] };

      dispatch(updateBlog(updatedBlog));
      dispatch(
        notificationThunk(
          `New comment added: ${commentData.content}`,
          "success",
          5,
        ),
      );
    } catch (error) {
      console.error("Error in addCommentThunk: ", error);
      dispatch(notificationThunk("Failed to add comment", "error", 5));
    }
  };
};

const deleteCommentThunk = (id) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user) {
      console.log("deleteCommentThunk error: no user found!");
      return;
    }

    commentService.setToken(user.token);

    try {
      await commentService.remove(id);
      dispatch(removeComment(id));
      dispatch(
        notificationThunk("Comment deleted successfully!", "success", 5),
      );
    } catch (error) {
      console.log("Error in deleteCommentThunk: ", error);
    }
  };
};

export default commentSlice.reducer;
