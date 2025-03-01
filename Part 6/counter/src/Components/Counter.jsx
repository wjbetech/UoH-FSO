// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  // Use useSelector to get the current count from the Redux store
  // @ts-ignore
  const count = useSelector((state) => state.counter);
  // Use useDispatch to dispatch actions
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter Demo</h1>
      <p>Count: {count}</p>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px", justifyContent: "center" }}>
        <button
          onClick={() =>
            dispatch({
              type: "counter/increment"
            })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "counter/decrement"
            })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "counter/reset"
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
