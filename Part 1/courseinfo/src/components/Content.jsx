import React from "react";

export const Content = (props) => {
  return (
    <div>
      <p>
        {props.part}: {props.exercises}
      </p>
    </div>
  );
};
