import React from 'react'
import commentService from "../../services/comments.js"
import { TextField } from "@mui/material"

export const CommentForm = () => {

  const handleSubmitComment = async (blogId, content) => {
    try {
      const newComment = await commentService.createComment(blogId, { content });
      console.log("Comment added: ", newComment)
    } catch (error) {
      console.error("handleAddComment error - failed to add comment: ", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.remove(commentId);
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("handleDeleteComment error - failed to delete comment: ", error)
    }
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <TextField
        id="standard-basic"
        label="Comment"
        variant="standard"
        inputProps={{
          "data-testid": "url",
          style: { color: "#ffffff" },
        }}
        InputLabelProps={{
          style: { color: "#b3b3b3" },
        }}
      />
    </form>
  )
}
