import PropTypes from "prop-types";

import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <p className="note-content">
        <span>{note.content}</span> <button onClick={toggleImportance}>{label}</button>
      </p>
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired
};

export default Note;
