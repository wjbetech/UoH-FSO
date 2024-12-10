// When you pass a child component, you can lump same child component props into an object
// to save you having to add unnecessary logic
// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age;
//
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old!
//       </p>
//       <p>So, you were probably born in {bornYear()}.</p>
//     </div>
//   );
// };
//
// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello
//         name="Maya"
//         age={36}
//       />
//       <Hello
//         name={"Peter"}
//         age={10}
//       />
//     </div>
//   );
// };
//
// export default App;

import { useState } from "react";
import { Display } from "./components/Display";
import { Button } from "./components/Button";

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);
  const handleReset = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button
        onClick={handleIncrement}
        label="Increment"
      />
      <Button
        onClick={handleDecrement}
        label="Decrement"
      />
      <Button
        onClick={handleReset}
        label="Reset"
      />
    </div>
  );
};

export default App;
