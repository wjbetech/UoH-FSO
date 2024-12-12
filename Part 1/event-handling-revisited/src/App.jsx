import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [value, setValue] = useState(10);

  const handleReset = () => setValue(0);

  const hello = () => {
    const handler = () => console.log("Hello world!");
    return handler;
  };

  return (
    <div>
      <span>{value}</span>

      {/* -- way #1 of handling resetting -- */}
      {/* -- typically not very advisable for code readability */}
      {/* <button onClick={() => setValue(0)}>reset to zero</button> */}

      {/* -- way #2 external handleReset -- */}
      {/* -- preferable, also set up props to work with Button component */}
      <Button
        onClick={handleReset}
        label="Reset"
      />

      {/* -- way #3 func returns func */}
      <Button
        onClick={hello()}
        label="hello-button"
      />
    </div>
  );
};

export default App;
