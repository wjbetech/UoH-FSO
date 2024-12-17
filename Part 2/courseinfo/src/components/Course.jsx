import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ name, parts }) {
  const totalExercises = parts.reduce((total, curr) => total + curr.exercises, 0);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  );
}
