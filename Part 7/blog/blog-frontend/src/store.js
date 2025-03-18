import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
  devTools: true,
});

export default store;
