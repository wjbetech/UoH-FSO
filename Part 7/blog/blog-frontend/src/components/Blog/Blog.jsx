import { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

// mui components
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Blog({
  blogs,
  blogInfo,
  handleDelete,
  handleLike,
  user,
}) {
  const { id } = useParams(); // ✅ Corrected key to match /blogs/:id
  const [showDetails, setShowDetails] = useState(false);
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

  return (
    <div style={{ marginBottom: "48px" }}>
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
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "rgba(255, 255, 150)",
            }}
          >
            {content}
          </p>
          <p>
            <span style={{ fontWeight: "bold", color: "#888" }}>Likes: </span>
            {likes}
          </p>
        </div>
      ) : (
        <div className="mini-blog-post">
          <h2 className="blog-title">{title}</h2>
          <Button
            onClick={toggleDetails}
            variant="contained"
            sx={{ width: "140px" }}
            size="small"
          >
            View
          </Button>
        </div>
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
