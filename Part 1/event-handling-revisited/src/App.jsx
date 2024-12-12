// PART 1 - "Complex state"

// import { useState } from "react";
//
// const App = () => {
//   const [counts, setCounts] = useState({
//     left: 0,
//     right: 0
//   });
//
//   const handleLeftClick = () => setCounts({ ...counts, left: counts.left + 1 });
//   const handleRightClick = () => setCounts({ ...counts, right: counts.right + 1 });
//
//   return (
//     <div>
//       <span>{counts.left}</span>
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       <span>{counts.right}</span>
//     </div>
//   );
// };
//
// export default App;

// PART 2 - "Handling arrays"

import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  // array that holds the # of every click made in the application
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = (props) => {
    console.log("You clicked: ", props, left, " times.");
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button
        onClick={handleLeftClick}
        text="left"
      ></Button>
      <Button
        onClick={handleRightClick}
        text="right"
      ></Button>
      {right}
      <div>
        <button
          onClick={() => {
            setLeft(0), setRight(0), setAll([]);
          }}
        >
          RESET
        </button>
      </div>
      <p>
        {allClicks.length} {allClicks.join(", ")}
      </p>
    </div>
  );
};

export default App;
