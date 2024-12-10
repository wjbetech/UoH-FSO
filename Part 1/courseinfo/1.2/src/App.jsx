import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ]
  };

  // I cleaned this up - I thought I could drop the 0 argument
  // but it started to give me very odd returns
  // This could be defined on the object itself possibly or even handled in a
  // separate utils file to stay really clean
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
  course.totalExercises = totalExercises;

  return (
    <div>
      <Header content={course.name} />
      <Content parts={course.parts} />
      <Total total={course.totalExercises} />
    </div>
  );
};

export default App;
