import PropTypes from "prop-types";

import { useState } from "react";

export default function Blog({ blogInfo, handleDelete, handleLikesClick, user }) {
  const [showDetails, setShowDetails] = useState(false);
  const { title, content, author, likes } = blogInfo;

  console.log(user ? user.username : "no user", blogInfo);
  const toggleDetails = () => setShowDetails(!showDetails);

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
              onClick={() => handleLikesClick(blogInfo.id)}
              className="like-button"
            >
              Like
            </button>
            {user && user.username === blogInfo.author ? (
              <button
                data-testid="delete-button"
                className="delete-button"
                onClick={() => {
                  handleDelete(blogInfo.id);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
          <p className="blog-author">Author: {author}</p>
          <p className="blog-content">{content}</p>
          <p>Likes: {likes}</p>
        </div>
      ) : (
        <div className="mini-blog-post">
          <h2 className="blog-title">{title}</h2>
          <button
            onClick={toggleDetails}
            className="view-button"
          >
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
    likes: PropTypes.number.isRequired
  }),
  handleDelete: PropTypes.func.isRequired,
  handleLikesClick: PropTypes.func.isRequired
};
