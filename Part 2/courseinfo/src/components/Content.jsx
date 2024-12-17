import Part from "./Part";

export default function Content({ parts }) {
  // debugging
  // could remove, leaving in - I am a mere prophet of the developer's oath
  // (and want brownie points with the professor)
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
