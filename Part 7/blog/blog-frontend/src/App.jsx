import { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  appendBlog,
  setBlogs,
  addBlogThunk,
  voteThunk,
  deleteBlogThunk,
} from "./reducers/blogReducer.js";
import { notificationThunk } from "./reducers/notificationReducer.js";
import {
  setUser,
  removeUser,
  loginThunk,
  logoutThunk,
} from "./reducers/userReducer.js";

// destructure loginService
import loginService from "./services/login.js";
const { login } = loginService;

// destructure noteService
import blogService from "./services/blogs.js";
const { getAll, setToken, update } = blogService;

// component imports
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog/Blog.jsx";
import BlogForm from "./components/BlogForm/BlogForm.jsx";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable.jsx";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(event);
      dispatch(loginThunk({ username, password }));
      dispatch(notificationThunk(`${user.username} logged in!`, "success", 5));

      // reset username and password fields for next potential login attempt
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      dispatch(notificationThunk("Invalid username or password", "error", 5));
    }
  };

  const handleLogout = async () => {
    dispatch(logoutThunk());
    dispatch(notificationThunk("Successfully logged out!", "success"));
  };

  const addBlog = async (blogObject) => {
    dispatch(appendBlog(blogObject));
  };

  const handleLikesClick = (id) => {
    dispatch(voteThunk(id));
  };

  const handleDelete = async (id) => {
    dispatch(deleteBlogThunk(id));
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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

  return (
    <div className="app">
      <h1>Bloglist</h1>

      <Notification
        notification={notification.message}
        type={notification.type}
      />

      {!user && loginForm()}
      {user && (
        <div className="blog-post-form">
          <p className="user-display">
            Logged in as {user.name}{" "}
            <button onClick={handleLogout}>Logout</button>
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
              user={user}
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
