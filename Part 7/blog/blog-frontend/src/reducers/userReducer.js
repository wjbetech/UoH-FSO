// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import notificationThunk from "./notificationReducer.js";
const { login } = loginService;

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

export const loginThunk = (user) => async (dispatch) => {
  try {
    const response = await login(user);
    console.log("Login successful:", response);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(response));
    dispatch(setUser(response));
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw new Error("Invalid username or password");
  }
};

export const logoutThunk = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(removeUser());
  };
};

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
