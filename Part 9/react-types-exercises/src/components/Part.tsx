import { CoursePartUnion } from "../types/coursePartTypes";
import { assertNever } from "../utils/assertNever";

type PartProps = {
  partData: CoursePartUnion;
};

const baseStyle: React.CSSProperties = {
  marginBottom: "8px",
  padding: "4px 12px",
  borderLeft: "2px solid"
};

export default function Part({ partData }: PartProps) {
  switch (partData.kind) {
    case "basic":
      return (
        <div style={{ ...baseStyle, borderLeftColor: "green" }}>
          <h3>{partData.name}</h3>
          <p>Exercises: {partData.exerciseCount}</p>
          <p>
            <em>{partData.description}</em>
          </p>
        </div>
      );

    case "group":
      return (
        <div style={{ ...baseStyle, borderLeftColor: "orange" }}>
          <h3>{partData.name}</h3>
          <p>Exercises: {partData.exerciseCount}</p>
          <p>Group projects: {partData.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div style={{ ...baseStyle, borderLeftColor: "maroon" }}>
          <h3>{partData.name}</h3>
          <p>Exercises: {partData.exerciseCount}</p>
          <p>
            <em>{partData.description}</em>
          </p>
          <p>
            Background material:{" "}
            <a href={partData.backgroundMaterial} target="_blank" rel="noopener noreferrer">
              {partData.backgroundMaterial}
            </a>
          </p>
        </div>
      );

    case "special":
      return (
        <div style={{ ...baseStyle, borderLeftColor: "cyan" }}>
          <h3>{partData.name}</h3>
          <p>Exercises: {partData.exerciseCount}</p>
          <p>
            <em>{partData.description}</em>
          </p>
          <p>Requirements: {partData.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(partData);
  }
}
