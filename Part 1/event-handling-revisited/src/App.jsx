import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [value, setValue] = useState(10);

  const handleReset = () => setValue(0);

  const print = (who) => {
    return () => console.log(who);
  };

  const setValueTo = (value) => {
    return () => {
      setValue(value);
    };
  };

  return (
    <>
      <div>
        <span>{value}</span>
        <Button
          onClick={print("World!")}
          label="World!"
        />

        <Button
          onClick={print("Hello, ")}
          label="Hello"
        />

        <Button
          onClick={print("React")}
          label="React"
        />
        <div>
          <Button
            onClick={setValueTo(value + 1)}
            label="+1"
          />
          <Button
            onClick={setValueTo(value - 1)}
            label="-1"
          />
          <Button
            onClick={setValueTo(1000)}
            label="Set to 1000"
          />
          <Button
            onClick={handleReset}
            label="Reset"
          />
        </div>
      </div>
    </>
  );
};

export default App;
