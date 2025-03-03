import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const combinedReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(combinedReducer);

store.subscribe(() => console.log(store.getState()))

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

