export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <p>
            {part.part}: {part.exercises}
          </p>
        );
      })}
    </div>
  );
};
