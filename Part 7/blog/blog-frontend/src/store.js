import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
  devTools: true,
});

export default store;
