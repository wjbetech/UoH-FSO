import { useState, useEffect } from "react";

// component imports
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

// destructure loginService
import loginService from "./services/login.js";
const { login } = loginService;

// destructure noteService
import blogService from "./services/blogs.js";
const { getAll, setToken } = blogService;

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
    url: "",
    likes: 0
  });
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      content: newBlog.content,
      likes: newBlog.likes
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        content: "",
        url: "",
        likes: 0
      });
    });

    setNotification("New blog successfully added!");
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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
      setNotification(`${user.name} successfully logged in!`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
      setToken(null);

      setNotification("Successfully logged out!");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
    } catch (error) {}
  };

  const handleBlogChange = ({ target: { name, value } }) => {
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value, author: user.name }));
    console.log("Current user: " + user.name);
    console.log(newBlog);
  };

  return (
    <div className="app">
      <h1>myBlog</h1>

      <Notification message={notification} />

      {user === null ? (
        <div className="form">
          <LoginForm
            handleLogin={handleLogin}
            message={notification}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </div>
      ) : (
        <div className="form">
          <div className="loggedin-user">
            <h3>Logged in as {user.username}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
          />
        </div>
      )}

      <div className="blogs">
        <h3>Blog Posts</h3>

        <ul>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blogInfo={blog}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
