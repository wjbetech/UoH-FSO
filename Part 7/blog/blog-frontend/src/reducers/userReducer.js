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

export const loginThunk = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await login(credentials);
      const loggedInUser = response.data;

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedInUser),
      );

      dispatch(setUser(loggedInUser));
      dispatch(
        notificationThunk(`${loggedInUser.username} logged in!`, "success", 5),
      );
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
};

export const logoutThunk = (username, password) => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(removeUser());
  };
};

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
