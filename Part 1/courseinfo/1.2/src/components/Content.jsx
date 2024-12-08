import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part
            // this is a terrible key but it works for this demo
            key={part.exercises}
            part={part.part}
            exercises={part.exercises}
          />
        );
      })}
    </div>
  );
};
