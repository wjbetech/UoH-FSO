import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const User = ({ blogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // find the blogs written by the user with id found in params
  const userBlogs = blogs.filter((blog) => blog.user.id === id);

  // gracefully handle finding no blogs, e.g. no user
  if (userBlogs.length === 0) {
    return (
      <div>
        <h1>Oh no!</h1>
        <p>It looks like no user was found or that user has no blogs yet!</p>
      </div>
    );
  }

  const handleReturn = (event) => {
    event.preventDefault();
    navigate("/users/");
  };

  return (
    <div>
      <Button
        onClick={handleReturn}
        sx={{ marginBottom: "24px", width: "200px" }}
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}
      >
        Back
      </Button>
      <h2>{`${userBlogs[0].author}'s Blogs`}</h2>
      <ul>
        {userBlogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <h3>{blog.title}</h3>
              </Link>{" "}
              <p>{blog.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
