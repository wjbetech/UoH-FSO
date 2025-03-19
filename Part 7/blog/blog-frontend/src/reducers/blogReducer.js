import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js"
import { notificationThunk } from "./notificationReducer";

const blogSlice = createSlice({
  
  // name of the functionality for this reducer
  name: "blog",

  // initial state for the blog slice
  initialState: {
    title: "",
    content: "", 
    author: "",
    likes: 0
  },

  reducers: {
    voteBlog(state, action) {
      // make sure to pass the blog id to the voteBlog call
      const blogId = action.payload
      const blog = state.find((b) => b.id === blogId)

      if (blog) {
        blog.likes += 1
      }
    },
    createBlog(state, action) {
      state.push(action.payload)
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    setBlogs(state, action) {
      return action.payload
    },
  }
})

export const { voteBlog, createBlog, appendBlog, setBlogs } = blogSlice.actions;

export const addBlogThunk = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
    dispatch(notificationThunk(`New blog added: ${newBlog.content.substring(0, 14)}`)); //
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs))
  }
}

export const voteThunk = (id) => {
  return async (dispatch, getState) => {
    const { blogs } = getState();
    const blogToVote = blogs.find(b => b.id === id);
    
    const updatedBlog = {
      ...blogToVote,
      votes: blogToVote.votes += 1
    }

    await blogService.update(id, updatedBlog);

    dispatch(voteBlog(id))
  }
}

export default blogSlice.reducer;