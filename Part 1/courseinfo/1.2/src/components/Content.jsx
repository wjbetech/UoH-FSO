import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <div>
      <Part
        part={parts[0].part}
        exercises={parts[0].exercises}
      />
      <Part
        part={parts[1].part}
        exercises={parts[1].exercises}
      />
      <Part
        part={parts[2].part}
        exercises={parts[2].exercises}
      />
    </div>
  );
};
