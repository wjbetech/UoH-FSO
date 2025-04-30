import Part from "./Part";
import { CoursePartUnion } from "../types/coursePartTypes";

type ContentProps = {
  courseParts: CoursePartUnion[];
};

export default function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((part) => {
        return <Part key={part.name} partData={part} />;
      })}
    </>
  );
}
