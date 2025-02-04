import { useState } from "react";

export default function Blog({ blogInfo, handleDelete, handleLikesClick }) {
  const [showDetails, setShowDetails] = useState(false);
  const { title, content, author, likes } = blogInfo;

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="blog-post">
      {showDetails ? (
        <div className="full-blog-post">
          <h2 className="blog-title">{title}</h2>
          <div className="blog-post-buttons">
            <button
              onClick={toggleDetails}
              className="view-button"
            >
              Close
            </button>
            <button
              onClick={() => handleLikesClick(blogInfo.id)}
              className="like-button"
            >
              Like
            </button>
            <button
              className="delete-button"
              onClick={handleDelete}
            >
              Delete
            </button>
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
