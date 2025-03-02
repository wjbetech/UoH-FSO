import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const voteGood = () => {
    store.dispatch({
      type: "GOOD"
    });
  };
  const voteOkay = () => {
    store.dispatch({
      type: "OKAY"
    });
  };
  const voteBad = () => {
    store.dispatch({
      type: "BAD"
    });
  };
  const resetVote = () => {
    store.dispatch({
      type: "ZERO"
    });
  };

  return (
    <div>
      <button onClick={voteGood}>good</button>
      <button onClick={voteOkay}>ok</button>
      <button onClick={voteBad}>bad</button>
      <button onClick={resetVote}>reset stats</button>
      <div>Good: {store.getState().good}</div>
      <div>Okay: {store.getState().okay} </div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  );
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
