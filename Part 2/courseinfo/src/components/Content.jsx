import Part from "./Part";

export default function Content({ parts }) {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
          id={part.id}
        />
      ))}
    </div>
  );
}
