import { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function Blog({
  blogs,
  blogInfo,
  handleDelete,
  handleLikesClick,
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
    <div className="blog-post">
      {showDetails ? (
        <div className="full-blog-post">
          <h2 className="blog-title">{title}</h2>
          <div className="blog-post-buttons">
            <button
              data-testid="close-button"
              onClick={toggleDetails}
              className="view-button"
            >
              Close
            </button>
            <button
              data-testid="like-button"
              onClick={() => handleLikesClick(blog)}
            >
              Like
            </button>
            {user && user.username === author ? (
              <button
                data-testid="delete-button"
                className="delete-button"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
            ) : null}
          </div>
          <p className="blog-author">Author: {author}</p>
          <p className="blog-content">{content}</p>
          <p>Likes: {likes}</p>
        </div>
      ) : (
        <div className="mini-blog-post">
          <h2 className="blog-title">{title}</h2>
          <button onClick={toggleDetails} className="view-button">
            View
          </button>
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
  handleLikesClick: PropTypes.func.isRequired,
  user: PropTypes.object,
};
