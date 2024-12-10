import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

const App = () => {
  const course = "Half Stack application development";

  // This is actually more or less what I did back in either 1.1 or 1.2
  // I am not 100% sure whether I am being asked to use just the <Part> element
  // or if I need to use <Part> and <Content>, so for now I will just do as I see fit
  // (this isn't my first React rodeo but I am not dogmatic about practices)
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ];

  return (
    <div>
      <Header content={course} />
      <Content parts={parts} />
      {/* It looks like I have to dynamically render out this part */}
      {/* You could do the maths logic outside of the return statement though! */}
      <Total total={`${parts[0].exercises + parts[1].exercises + parts[2].exercises}`} />
    </div>
  );
};

export default App;
