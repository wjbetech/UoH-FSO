function BlogForm({ addBlog, newBlog, handleBlogChange }) {
  return (
    <div className="">
      <form onSubmit={addBlog}>
        <div className="blog-form-input">
          <label>Title:</label>
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div className="blog-form-input">
          <label>Content:</label>
          <textarea
            value={newBlog.content}
            name="content"
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default BlogForm;
