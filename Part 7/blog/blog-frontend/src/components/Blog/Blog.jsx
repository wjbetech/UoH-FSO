import { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

// components
import { CommentForm } from "../CommentForm/CommentForm";

// mui components
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCommentIcon from "@mui/icons-material/AddComment";

export default function Blog({
  blogs,
  blogInfo,
  handleDelete,
  handleLike,
  user,
}) {
  const { id } = useParams(); // ✅ Corrected key to match /blogs/:id
  const [showDetails, setShowDetails] = useState(false);
  const [toggleCommentForm, setToggleCommentForm] = useState(false);
  const navigate = useNavigate();

  // ✅ Use blogInfo if passed, otherwise find the blog from the list
  const blog = blogInfo || blogs.find((b) => b.id === id);

  // ✅ Ensure blog exists before rendering
  if (!blog) {
    return <h2>No blog found!</h2>;
  }

  const { title, content, author, likes } = blog; // ✅ Use `blog`, not `blogInfo`

  const toggleDetails = () => setShowDetails(!showDetails);

  const handleReturn = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleToggleForm = (event) => {
    event.preventDefault();
    setToggleCommentForm(!toggleCommentForm);
  };

  return (
    <div
      style={{
        marginBottom: "24px",
        marginTop: "24px",
        border: "2px solid grey",
        padding: "0 12px 12px 12px",
        borderRadius: "8px",
      }}
    >
      {showDetails ? (
        <div className="full-blog-post">
          <h2 className="blog-title">{title}</h2>
          <div
            className="blog-post-buttons"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              data-testid="close-button"
              onClick={toggleDetails}
              variant="contained"
              size="small"
              disableElevation
              sx={{ width: "88px", alignItems: "normal" }}
            >
              <CloseIcon fontSize="small" />
              Close
            </Button>
            <Button
              data-testid="like-button"
              variant="contained"
              color="success"
              size="small"
              disableElevation
              onClick={() => handleLike(blog)}
              sx={{
                width: "88px",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <ThumbUpIcon
                sx={{
                  marginRight: "4px",
                  fontSize: "14px",
                  marginBottom: "2px",
                }}
              />
              Like
            </Button>
            {user && user.username === author ? (
              <Button
                data-testid="delete-button"
                onClick={() => handleDelete(blog.id)}
                variant="contained"
                size="small"
                disableElevation
                color="error"
                sx={{ width: "88px" }}
              >
                <DeleteIcon
                  sx={{
                    marginRight: "4px",
                    fontSize: "16px",
                    marginBottom: "2px",
                  }}
                />
                Delete
              </Button>
            ) : null}
          </div>
          <p className="blog-author">
            <span style={{ fontWeight: "bold", color: "#888" }}>Author:</span>{" "}
            {author}
          </p>
          <p
            className="blog-content"
            style={{
              fontSize: "1.25rem",
            }}
          >
            {content}
          </p>
          <p>
            <span style={{ fontWeight: "bold", color: "#888" }}>Likes: </span>
            {likes}
          </p>
          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
              <h3>Comments</h3>
              {!toggleCommentForm ? (
                <Button
                  onClick={handleToggleForm}
                  variant="contained"
                  color="info"
                  sx={{ width: "200px" }}
                  size="small"
                >
                  Add Comment
                  <AddCommentIcon
                    sx={{ fontSize: "16px", marginLeft: "4px" }}
                  />
                </Button>
              ) : (
                ""
              )}
            </div>
            <ul>
              {blog.comments.map((comment) => {
                return (
                  <li key={comment.id} style={{ listStyle: "none" }}>
                    <strong style={{ color: "rgba(0, 255, 25, 0.5)" }}>
                      {comment.user.username}:{" "}
                    </strong>{" "}
                    {comment.content}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mini-blog-post">
          <h2 className="blog-title">{title}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <Button
              onClick={toggleDetails}
              variant="contained"
              sx={{ width: "124px" }}
              size="small"
            >
              View
              <VisibilityIcon
                sx={{
                  marginLeft: "6px",
                  fontSize: "16px",
                  marginBottom: "2px",
                }}
              />
            </Button>
          </div>
        </div>
      )}
      {toggleCommentForm ? (
        <CommentForm
          user={user}
          blogId={blog.id}
          handleToggleForm={handleToggleForm}
        />
      ) : (
        ""
      )}
    </div>
  );
}

Blog.propTypes = {
  blogInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    }),
  ),
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object,
};
