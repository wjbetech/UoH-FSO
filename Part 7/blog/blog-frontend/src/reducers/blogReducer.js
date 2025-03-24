import { createSlice } from "@reduxjs/toolkit";
import { notificationThunk } from "./notificationReducer";
import blogService from "../services/blogs.js";
const { update, remove, setToken } = blogService;
import { useSelector } from "react-redux";

const blogSlice = createSlice({
  // name of the functionality for this reducer
  name: "blogs",

  // initial state for the blog(s) slice
  initialState: [],

  reducers: {
    setBlogs: (state, action) => action.payload || [],

    appendBlog: (state, action) => {
      state.push(action.payload);
    },

    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
    },

    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, voteBlog, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(Array.isArray(blogs) ? blogs : []));
  } catch (error) {
    console.error("Error in initializeBlogs: ", error);
    dispatch(setBlogs([]));
  }
};

export const addBlogThunk = (blogData, token) => {
  return async (dispatch) => {
    try {
      // Set the token before creating the blog
      blogService.setToken(token);

      const newBlog = await blogService.create(blogData);
      dispatch(appendBlog(newBlog));
      dispatch(
        notificationThunk(`New blog added: ${blogData.title}`, "success", 5),
      );
    } catch (error) {
      console.log("Error in addBlogThunk: ", error);
      // You might want to display an error notification here
      dispatch(
        notificationThunk(`Failed to add blog: ${error.message}`, "error", 5),
      );
    }
  };
};

export const voteThunk = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { blogs, user } = state;

    const blogToVote = blogs.find((blog) => blog.id === id);

    if (!user) {
      console.error("User not logged in");
      dispatch(
        notificationThunk("Please log in to like blog posts!", "error", 5),
      );
      return;
    }

    // since we have the user (+token) in state, we can extract and set the token now
    blogService.setToken(user.token);

    const updatedBlog = {
      ...blogToVote,
      likes: blogToVote.likes + 1,
    };

    try {
      const updatedBlogResponse = await blogService.update(id, updatedBlog);
      dispatch(updateBlog(updatedBlogResponse));
      dispatch(notificationThunk(`Liked "${blogToVote.title}"`, "success", 3));
    } catch (error) {
      console.error("Error voting:", error);
      dispatch(
        notificationThunk(
          `Error liking post: ${error.message || "Unknown error"}`,
          "error",
          5,
        ),
      );
    }
  };
};

export const deleteBlogThunk = (id) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user) {
      console.error("User not found in state");
      return;
    }

    blogService.setToken(user.token);

    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(notificationThunk(`Blog deleted successfully!`, "success", 5));
    } catch (error) {
      console.log("Error in deleteBlogThunk: ", error);
    }
  };
};

export default blogSlice.reducer;
