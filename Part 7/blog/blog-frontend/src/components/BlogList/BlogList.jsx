import React from "react";
import Blog from "../Blog/Blog";

const BlogList = ({ blogs, handleDelete, handleLike, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="blogs">
      <h3>Blog Posts</h3>

      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blogInfo={blog}
            user={user}
            handleDelete={() => handleDelete(blog, user.token)}
            handleLikesClick={() => handleLike(blog, user.token)}
          />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
