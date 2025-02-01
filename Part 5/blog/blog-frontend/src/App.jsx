import { useState, useEffect } from "react";

// component imports
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable.jsx";

// destructure loginService
import loginService from "./services/login.js";
const { login } = loginService;

// destructure noteService
import blogService from "./services/blogs.js";
const { getAll, setToken } = blogService;

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loginVisible, setLoginVisible] = useState(true);
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

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const addBlog = (event) => {
    try {
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

  const handleDelete = async () => {
    try {
    } catch (error) {}
  };

  const handleBlogChange = ({ target: { name, value } }) => {
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value, author: user.name }));
    console.log("Current user: " + user.name);
    console.log(newBlog);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            className="show-login"
            onClick={() => setLoginVisible(true)}
          >
            Login
          </button>
          <div style={showWhenVisible}>
            <LoginForm
              handleLogin={handleLogin}
              message={notification}
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
              hideLogin={() => setLoginVisible(false)}
            />
          </div>
        </div>
      </div>
    );
  };

  const noteForm = () => {
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
    </form>;
  };

  return (
    <div className="app">
      <h1>myBlog</h1>

      <Notification
        message={notification.message}
        type={notification.type}
      />
      {!user && loginForm()}
      {user === null ? (
        <loginForm />
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
