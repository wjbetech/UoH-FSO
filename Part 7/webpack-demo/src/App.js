import React, { useState, useEffect } from "react";
import axios from "axios";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      <h1>Hello, React!</h1>
      <p>This is a simple React application, bundled with Webpack!</p>
      <p>Button Clicks: {counter}</p>
      <div style={{ marginTop: "44px" }}>
        <button onClick={handleClick}>Click!</button>
      </div>
      <div style={{ marginTop: "44px" }}>
        <p>
          {notes.length} notes on the server @ {BACKEND_URL}
        </p>
      </div>
    </div>
  );
};

export default App;
