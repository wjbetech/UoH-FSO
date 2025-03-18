import PropTypes from "prop-types";

import { useState } from "react";

export default function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      content: newBlog.content,
      url: newBlog.url,
      likes: 0,
    });
    setNewBlog({ title: "", content: "", author: "", url: "" });
  };

  return (
    <div className="form">
      <h2>Create New Blog Post</h2>
      <form onSubmit={addBlog}>
        <div className="blog-form-input">
          <label>
            Title:
            <input
              type="text"
              data-testid="title"
              value={newBlog.title}
              name="title"
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </label>
        </div>
        <div className="blog-form-input">
          <label>
            Content:
            <textarea
              value={newBlog.content}
              data-testid="content"
              name="content"
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </label>
        </div>
        <div className="blog-form-input">
          <label>
            URL:
            <input
              type="text"
              data-testid="url"
              value={newBlog.url}
              name="url"
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, url: e.target.value }))
              }
            />
          </label>
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
