import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  // pass a generic name to handle one function
  name: "notification",

  // pass an initial empty state
  initialState: { message: null, type: null },

  // reducers to handle state
  reducers: {
    // for setNotification, the payload should contain a message and a type
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },

    // for clearNotification, empty and nullify props
    clearNotification: () => {
      return {
        message: null,
        type: null,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// notificationThunk takes three props:
// message or 'content'
// type for styling, "success" green or "error" red
// seconds for how long notification stays
export const notificationThunk = (message, type, seconds) => (dispatch) => {
  dispatch(setNotification({ message, type }));
  setTimeout(() => dispatch(clearNotification()), seconds * 1000);
};

export default notificationSlice.reducer;
