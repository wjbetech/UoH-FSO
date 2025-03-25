import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addBlogThunk } from "../../reducers/blogReducer";
import store from "../../store";
import { useSelector } from "react-redux";

// mui components
import { Button, Grid, TextField } from "@mui/material";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(addBlogThunk(newBlog, userToken));
    setNewBlog({ title: "", content: "", author: user.username, url: "" });
  };

  return (
    <div className="form">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, title: e.target.value }))
              }
              // I don't really like this set up for handling the mUI form
              // styles, but it works and I don't think cleaning it up is
              // pertinent right now
              inputProps={{
                "data-testid": "title",
                style: { color: "#ffffff" },
              }}
              InputLabelProps={{
                style: { color: "#b3b3b3" },
              }}
              sx={{
                marginTop: "14px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4d4d4d",
                  },
                  "&:hover fieldset": {
                    borderColor: "#666666",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              name="content"
              multiline
              minRows={4}
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, content: e.target.value }))
              }
              inputProps={{
                "data-testid": "content",
                style: { color: "#ffffff" },
              }}
              InputLabelProps={{
                style: { color: "#b3b3b3" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#4d4d4d" },
                  "&:hover fieldset": { borderColor: "#666666" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL"
              variant="outlined"
              name="url"
              value={newBlog.url}
              onChange={(e) =>
                setNewBlog((prev) => ({ ...prev, url: e.target.value }))
              }
              inputProps={{
                "data-testid": "url",
                style: { color: "#ffffff" },
              }}
              InputLabelProps={{
                style: { color: "#b3b3b3" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#4d4d4d" },
                  "&:hover fieldset": { borderColor: "#666666" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                width: "200px",
                mt: 2,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add Blog
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
