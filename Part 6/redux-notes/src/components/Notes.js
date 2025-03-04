import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "../reducers/noteReducer";
import React from "react";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    switch (state.filter) {
      case "ALL":
        return state.notes;
      case "IMPORTANT":
        return state.notes.filter((note) => note.important);
      case "UNIMPORTANT":
        return state.notes.filter((note) => !note.important);
      default:
        return state.notes;
    }
  });

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportance(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
