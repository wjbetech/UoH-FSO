import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addBlogThunk } from "../../reducers/blogReducer";
import store from "../../store";
import { useSelector } from "react-redux";

import { useState } from "react";

export default function BlogForm({ user }) {
  const dispatch = useDispatch();

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    url: "",
    author: user.username,
  });

  const userToken = user.token;
  console.log("userToken in BlogForm: ", userToken);

  const addBlog = async (event) => {
    event.preventDefault();

    if (!user || !user.token) {
      console.error("No user token available");
      return;
    }

    console.log("Submitting blog with token:", user.token);

    await dispatch(
      addBlogThunk({
        blogData: newBlog,
        token: user.token,
      }),
    );

    setNewBlog({ title: "", content: "", author: user.username, url: "" });
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
