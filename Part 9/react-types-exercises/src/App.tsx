import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePartUnion } from "./types/coursePartTypes";
import { assertNever } from "./utils/assertNever";

const App = () => {
  const courseName = "Half Stack Application Development";
  const courseParts: CoursePartUnion[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  courseParts.map((part) => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case "background":
        console.log(part.name, part.backgroundMaterial, part.description);
        break;
      case "special":
        console.log(part.name, part.requirements, part.description);
        break;
      default:
        return assertNever(part);
    }
  });

  return (
    <div className="container">
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
