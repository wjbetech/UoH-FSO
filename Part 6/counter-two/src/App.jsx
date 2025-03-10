import "./App.css";
import Button from "./components/Button.jsx";
import Display from "./components/Display.jsx";

const App = () => {
  return (
    <div>
      <h1>Counter</h1>
      <Display />
      <div>
        <Button
          type="INC"
          label="+"
        />
        <Button
          type="DEC"
          label="-"
        />
        <Button
          type="ZERO"
          label="0"
        />
      </div>
    </div>
  );
};

export default App;



