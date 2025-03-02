import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import React from "react";

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
