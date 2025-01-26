import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <span className="note-content">
        {note.content} <button onClick={toggleImportance}>{label}</button>
      </span>
    </li>
  );
};

export default Note;
