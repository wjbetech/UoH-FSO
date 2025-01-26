import React from "react";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login.js";

// components
import LoginForm from "./components/LoginForm.jsx";
import NoteForm from "./components/NoteForm.jsx";

// destructure loginService
const { login } = loginService;

// destructure noteService
const { setToken } = noteService;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password
      });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Invalid username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          message={errorMessage}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div className="note-form">
          <h2>Logged in as {user.username}</h2>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={handleNoteChange}
          />
        </div>
      )}

      <div className="notes">
        <h3>Notes</h3>

        <div className="show-important-button">
          <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
        </div>

        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
