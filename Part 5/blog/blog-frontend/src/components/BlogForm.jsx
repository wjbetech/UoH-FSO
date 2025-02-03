import { useState } from "react";

function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      content: newBlog.content,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    });
    setNewBlog("");
  };

  return (
    <div className="form">
      <h2>Create New Blog Post</h2>
      <form onSubmit={addBlog}>
        <div className="blog-form-input">
          <label>Title:</label>
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={(event) => setNewBlog(event.target.value)}
          />
        </div>
        <div className="blog-form-input">
          <label>Content:</label>
          <textarea
            value={newBlog.content}
            name="content"
            onChange={(event) => setNewBlog(event.target.value)}
          />
        </div>
        <div className="blog-form-input">
          <label>URL:</label>
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={(event) => setNewBlog(event.target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default BlogForm;
