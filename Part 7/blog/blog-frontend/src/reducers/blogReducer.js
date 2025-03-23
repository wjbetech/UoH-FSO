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

export const addBlogThunk = (blogData) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogData);
      dispatch(appendBlog(newBlog));
      dispatch(
        notificationThunk(`New blog added: ${blogData.title}`, "success", 5),
      );
    } catch (error) {
      console.log("Error in addBlogThunk: ", error);
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

    // format the token correctly with Bearer prefix
    const formattedToken = `Bearer ${token}`;

    console.log("Liking blog with id: ", id);

    try {
      const updatedBlogResponse = await blogService.update(
        id,
        updatedBlog,
        formattedToken,
      );
      dispatch(updateBlog(updatedBlogResponse));
    } catch (error) {
      console.error("Error voting:", error);
      console.log("Error details:", error.response?.data);
    }
  };
};

export const deleteBlogThunk = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(notificationThunk(`Blog deleted successfully!`, "success"));
    } catch (error) {
      console.log("Error in deleteBlogThunk: ", error);
    }
  };
};

export default blogSlice.reducer;
