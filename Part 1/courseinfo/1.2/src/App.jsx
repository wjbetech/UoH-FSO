import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

const App = () => {
  // cleaned up the data into an array because feng shui
  const parts = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 }
  ];

  return (
    <div>
      <Header content="Half Stack application development" />
      <Content parts={parts} />
      {/* this part could be handled cleaner outside of the return-render */}
      <Total total={`${parts[0].exercises + parts[1].exercises + parts[2].exercises}`} />
    </div>
  );
};

export default App;
