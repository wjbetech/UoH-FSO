// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import counterStore from "./counterStore";

import Counter from "./Components/Counter";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={counterStore}>
      <Counter />
    </Provider>
  );
}

export default App;
