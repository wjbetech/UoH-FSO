import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const combinedReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(combinedReducer);

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(createNote("combineReducers forms one reducer from many simple reducers"))

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

