import { useState, useEffect } from "react";
import { NoteType } from "./types/types";
import { getAllNotes, createNote } from "./services/noteService";

// components
// import NewNoteForm from "./components/NewNoteForm";

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([{ id: "1", content: "First test note!" }]);

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  });

  const handleNoteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({
      content: newNote
    }).then((data) => {
      setNotes(notes.concat(data));
    });

    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={handleNoteCreation}>
        <input value={newNote} onChange={(event) => setNewNote(event.target.value)} />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
