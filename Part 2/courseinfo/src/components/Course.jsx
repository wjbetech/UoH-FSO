import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ course }) {
  const { name, parts } = course;

  // I already did this, just pushing a part2-3 anyways for completeness
  const totalExercises = parts.reduce((sum, p) => sum + p.exercises, 0);
  console.log(totalExercises);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  );
}
