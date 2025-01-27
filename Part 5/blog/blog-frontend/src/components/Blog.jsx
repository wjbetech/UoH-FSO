export default function Blog({ blogInfo }) {
  const { title, username, author, url, likes } = blogInfo;

  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </a>
      <p>Likes: {likes}</p>
    </div>
  );
}
