import { createSlice } from "@reduxjs/toolkit";
import { notificationThunk } from "./notificationReducer";
import blogService from "../services/blogs.js"
const { update } = blogService;
import commentService from "../services/comments.js"
const { create, remove, setToken } = commentService
import { useSelector } from "react-redux";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comment: ""
  },

  reducers: {
    appendComment: (state, action) => action.payload,

    removeComment: (state, action) => action.payload
  },
})

export const { appendComment, removeComment } = commentSlice.actions; 

export const addCommentThunk = (comment, token) => {
  return async (dispatch) => {
    try {
      commentService.setToken(token)

      const newComment = await commentService.create(comment);

      dispatch(appendComment(newComment))

      dispatch(notificationThunk(`New comment added: ${comment}`, "success", 5))
    } catch (error) {
      console.log("Error in addCommentThunk: ", "error")

      dispatch(notificationThunk("addCommentThunk error - failed to add comment: ", error, "error", 5))
    }
  }
}

const deleteCommentThunk = (id) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user) {
      console.log("deleteCommentThunk error: no user found!")
      return;
    }

    commentService.setToken(user.token)

    try {
      await commentService.remove(id);
      dispatch(removeComment(id));
      dispatch(notificationThunk("Comment deleted successfully!", "success", 5))
    } catch (error) {
      console.log("Error in deleteCommentThunk: ", error)
    }
  }
}

export default commentSlice.reducer;