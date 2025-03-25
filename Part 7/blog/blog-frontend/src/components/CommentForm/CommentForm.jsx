import React, { useState } from "react";
import { useDispatch } from "react-redux";
import commentService from "../../services/comments.js";
import { TextField, Button } from "@mui/material";
import { addCommentThunk } from "../../reducers/commentReducer.js";

// mui components
import AddCommentIcon from "@mui/icons-material/AddComment";

export const CommentForm = ({ user, blogId, handleToggleForm }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      dispatch(addCommentThunk(blogId, { content: comment }, user.token));
      console.log("Comment added: ", comment);
      setComment("");
    } catch (error) {
      console.error("handleAddComment error - failed to add comment: ", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.remove(commentId);
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error(
        "handleDeleteComment error - failed to delete comment: ",
        error,
      );
    }
  };

  return (
    <form onSubmit={handleSubmitComment}>
      <TextField
        id="standard-basic"
        label="Comment"
        variant="standard"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a new comment..."
        inputProps={{
          "data-testid": "url",
          style: { color: "#ccc" },
        }}
        InputLabelProps={{
          style: { color: "rgba(255, 255, 255, 0.25)" },
        }}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <Button type="submit" variant="contained" size="small" color="success">
          Add Comment
          <AddCommentIcon sx={{ fontSize: "16px", marginLeft: "4px" }} />
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="error"
          onClick={handleToggleForm}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
