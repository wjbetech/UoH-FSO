import { useState, useEffect } from "react";

// destructure loginService
import loginService from "./services/login.js";
const { login } = loginService;

// destructure noteService
import blogService from "./services/blogs.js";
const { getAll, setToken, update, create } = blogService;

// component imports
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable.jsx";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
    url: "",
    likes: 0
  });
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        content: "",
        url: "",
        likes: 0
      });

      showNotification("New blog created!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to create new blog!", "error");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setToken(user.token);
      setUser(user);
      showNotification(`${user.name} successfully logged in!`, "success");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      showNotification("Invalid username or password", "error");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
      setToken(null);

      showNotification("Successfully logged out!", "success");
    } catch (error) {
      showNotification("Invalid username or password!", error);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log(blogs);

    try {
      const blogToDelete = blogs.find((blog) => blog.id.toString() === id.toString());

      if (!blogToDelete) {
        console.log("Could not find any blog!");
        return;
      } else {
        console.log("blogToDelete: " + blogToDelete);
      }

      if (window.confirm(`Are you sure you want to delete ${blogToDelete.content}`)) {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      console.log(error);
      showNotification("Failed to delete blog!", "error");
    }
  };

  const handleLikesClick = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id);
      console.log("Blog to update: ", blogToUpdate);

      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      console.log("Updated blog: ", updatedBlog);

      const returnedBlog = await update(id, updatedBlog);
      console.log("Returned blog: ", returnedBlog);

      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
    } catch (error) {
      console.log(error);
      showNotification("Failed to update likes!", "error");
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div className="togglable">
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
            hideLogin={() => setLoginVisible(false)}
            setLoginVisible={setLoginVisible}
          />
        </div>
      </div>
    );
  };

  const blogForm = () => {
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">Add</button>
    </form>;
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div className="app">
      <h1>myBlog</h1>

      <Notification
        message={notification.message}
        type={notification.type}
      />

      {!user && loginForm()}
      {user && (
        <div className="blog-post-form">
          <p className="user-display">
            Logged in as {user.name} <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="+ New Blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <div className="blogs">
        <h3>Blog Posts</h3>

        <ul>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blogInfo={blog}
              handleDelete={handleDelete}
              handleLikesClick={handleLikesClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
