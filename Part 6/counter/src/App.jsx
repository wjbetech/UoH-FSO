import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>Counter Demo</h1>
      <p>Count: {count}</p>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px", justifyContent: "center" }}>
        <button onClick={() => handleIncrement()}>+</button>
        <button onClick={() => handleDecrement()}>-</button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
    </div>
  );
}

export default App;
