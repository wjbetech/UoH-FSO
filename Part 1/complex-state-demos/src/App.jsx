import { useState } from "react";

const App = () => {
  const [counts, setCounts] = useState({
    left: 0,
    right: 0
  });

  const handleLeftClick = () => setCounts({ ...counts, left: counts.left + 1 });
  const handleRightClick = () => setCounts({ ...counts, right: counts.right + 1 });

  return (
    <div>
      <span>{counts.left}</span>
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      <span>{counts.right}</span>
    </div>
  );
};

export default App;
