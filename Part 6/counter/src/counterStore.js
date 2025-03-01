import { configureStore } from "@reduxjs/toolkit";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "counter/increment":
      return state + 1;
    case "counter/decrement":
      return state - 1;
    case "counter/reset":
      return 0;
    default:
      return state;
  }
};

const counterStore = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default counterStore;
