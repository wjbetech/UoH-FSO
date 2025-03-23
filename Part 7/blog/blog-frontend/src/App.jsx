// @ts-nocheck

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

// React-Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

// destructure loginService
import loginService from "./services/login.js";
const { login } = loginService;

// destructure noteService
import blogService from "./services/blogs.js";
const { getAll, setToken, update } = blogService;

// component imports
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Blog from "./components/Blog/Blog.jsx";
import BlogForm from "./components/BlogForm/BlogForm.jsx";
import Notification from "./components/Notification/Notification.jsx";
import Togglable from "./components/Togglable/Togglable.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import BlogList from "./components/BlogList/BlogList.jsx";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON && loggedUserJSON !== "undefined") {
      try {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));

        // set the blogService token when loading from localStorage
        // - not sure why this is done in blogs service and not login
        blogService.setToken(user.token);
      } catch (error) {
        console.error("Error parsing localStorage user:", error);
        // remove any error'd localStorage var
        window.localStorage.removeItem("loggedBlogAppUser");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = { username, password };
      const loggedInUser = await dispatch(loginThunk(user));

      dispatch(
        notificationThunk(
          `${user.username} logged in successfully!`,
          "success",
          5,
        ),
      );
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      dispatch(notificationThunk("Invalid username or password!", "error", 5));
    }
  };

  const handleLogout = async () => {
    dispatch(logoutThunk());
    blogService.setToken("");
    dispatch(notificationThunk("Successfully logged out!", "success", 5));
  };

  const handleLike = async (blog, token) => {
    if (!token) {
      dispatch(
        notificationThunk("Cannot vote without logging in!", "error", 5),
      );
    } else {
      // we don't have to pass `Bearer ...` in here
      dispatch(voteThunk(blog.id, token));
    }
  };

  const handleDelete = async (blog) => {
    if (!user) return;
    dispatch(deleteBlogThunk(blog.id));
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

  return (
    <div className="app">
      <NavBar />
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
            <BlogForm user={user} />
          </Togglable>
        </div>
      )}

      <BlogList
        blogs={blogs}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    </div>
  );
}

export default App;
