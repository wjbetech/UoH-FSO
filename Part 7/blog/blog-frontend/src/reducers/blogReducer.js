import { createSlice } from "@reduxjs/toolkit";
import { notificationThunk } from "./notificationReducer";
import blogService from "../services/blogs.js";
const { update } = blogService;

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
    console.log("Fetched blogs:", blogs); // Debugging statement
    dispatch(setBlogs(Array.isArray(blogs) ? blogs : [])); // Ensure an array is passed
  } catch (error) {
    console.error("Error fetching blogs:", error);
    dispatch(setBlogs([])); // Handle error case
  }
};

export const addBlogThunk = (blog) => {
  return async (dispatch, getState) => {
    try {
      const user = getState.user();
      const newBlog = await blogService.create({
        ...blog,
        author: user.username,
      });
      dispatch(appendBlog(newBlog));
      dispatch(
        notificationThunk(
          `New blog added: ${(newBlog.content.substring(0, 14), "success")}`,
        ),
      );
    } catch (error) {
      dispatch(
        notificationThunk(
          `Blog could not be added! - ${error.message}`,
          "error",
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
      await blogService.remove(id, token);
      dispatch(removeBlog(id));
      dispatch(notificationThunk(`Blog deleted successfully!`, "success"));
    } catch (error) {
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
