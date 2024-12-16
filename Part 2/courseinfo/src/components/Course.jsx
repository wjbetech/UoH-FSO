import Header from "./Header";
import Content from "./Content";

export default function Course({ course }) {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
}
