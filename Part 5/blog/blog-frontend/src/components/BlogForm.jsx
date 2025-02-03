import { useState } from "react";

function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    url: ""
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      content: newBlog.content,
      url: newBlog.url,
      likes: 0
    });
    setNewBlog({ title: "", content: "", author: "", url: "" });
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
            onChange={(e) => setNewBlog((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div className="blog-form-input">
          <label>Content:</label>
          <textarea
            value={newBlog.content}
            name="content"
            onChange={(e) => setNewBlog((prev) => ({ ...prev, content: e.target.value }))}
          />
        </div>
        <div className="blog-form-input">
          <label>URL:</label>
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={(e) => setNewBlog((prev) => ({ ...prev, url: e.target.value }))}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default BlogForm;
