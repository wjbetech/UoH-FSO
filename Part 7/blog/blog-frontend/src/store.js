import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
  devTools: true,
});

export default store;
