import { createSlice } from "@reduxjs/toolkit";
import { notificationThunk } from "./notificationReducer";
import blogService from "../services/blogs.js";
const { update, remove, setToken } = blogService;
import { useSelector } from "react-redux";

const blogSlice = createSlice({
  // name of the functionality for this reducer
  name: "blogs",

  // initial state for the blog slice
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
    console.error("Error fetching blogs:", error);
    dispatch(setBlogs([]));
  }
};

export const addBlogThunk = ({ blogData, token }) => {
  return async (dispatch) => {
    try {
      // Format token properly with Bearer prefix
      const formattedToken = `Bearer ${token}`;

      console.log("Sending blog data:", blogData);
      console.log("With auth token:", formattedToken);

      const newBlog = await blogService.create(blogData, formattedToken);

      dispatch(appendBlog(newBlog));
      dispatch(
        notificationThunk(`New blog added: ${blogData.title}`, "success", 5),
      );
    } catch (error) {
      console.log("Error inside addBlogThunk: ", error);
      console.log("Error details:", error.response?.data);
      dispatch(
        notificationThunk(
          `Blog could not be added! - ${error.response?.data?.error || error.message}`,
          "error",
          5,
        ),
      );
    }
  };
};

export const voteThunk = (id, token) => {
  return async (dispatch, getState) => {
    const { blogs } = getState();
    const blogToVote = blogs.find((blog) => blog.id === id);

    const updatedBlog = {
      ...blogToVote,
      likes: blogToVote.likes + 1,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const updatedBlogResponse = await blogService.update(
        id,
        updatedBlog,
        config,
      );
      dispatch(updateBlog(updatedBlogResponse));
    } catch (error) {
      console.error("Error voting:", error);
    }
  };
};

export const deleteBlogThunk = (id, token) => {
  return async (dispatch) => {
    try {
      // Format token with Bearer prefix
      const formattedToken = `Bearer ${token}`;
      console.log("Deleting blog with ID:", id);
      console.log("Using token:", formattedToken);

      await blogService.remove(id, formattedToken);
      dispatch(removeBlog(id));
      dispatch(notificationThunk(`Blog deleted successfully!`, "success"));
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.status,
        error.response?.data,
      );
      dispatch(
        notificationThunk(
          `Blog could not be deleted! - ${error.message}`,
          "error",
        ),
      );
    }
  };
};

export default blogSlice.reducer;
