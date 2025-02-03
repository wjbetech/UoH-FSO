export default function Blog({ blogInfo, handleDelete }) {
  const { title, content, author, likes } = blogInfo;

  return (
    <div className="blog-post">
      <h2 className="blog-title">{title}</h2>
      <div className="blog-post-buttons">
        <button className="view-button">View</button>
        <button className="like-button">Like</button>
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
  );
}
