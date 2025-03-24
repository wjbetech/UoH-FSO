import React from "react";
import Blog from "../Blog/Blog";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs, handleDelete, handleLike, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const navigate = useNavigate();

  const handleReturn = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h2 style={{ fontSize: "4rem" }}>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blogInfo={blog}
          handleDelete={handleDelete}
          handleLike={handleLike}
          user={user}
        />
      ))}
    </div>
  );
};

export default BlogList;
