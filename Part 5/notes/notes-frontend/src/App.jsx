import React from "react";
import { useState, useEffect, useRef } from "react";

// services
import noteService from "./services/notes";
const { getAll, setToken, update, create } = noteService;

import loginService from "./services/login.js";
const { login } = loginService;

// components
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import NoteForm from "./components/NoteForm/NoteForm.jsx";
import Note from "./components/Note/Note.jsx";
import Notification from "./components/Notification/Notification.jsx";
import Togglable from "./components/Togglable/Togglable.jsx";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const addNote = (noteObject) => {
    try {
      noteFormRef.current.toggleVisibility();
      create(noteObject).then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      });

      showNotification("New blog created!", "success");
    } catch (error) {
      showNotification("Failed to create new blog!", "error");
      console.log(error);
    }
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
      showNotification(`${user.name} logged in!`, "success");
      setUsername("");
      setPassword("");
    } catch (error) {
      showNotification("Invalid username or password!", "error");
      console.log(error);
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setNotification(`Note '${note.content}' was already removed from server`, "error");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedNoteAppUser");
      setUser(null);
      setToken(null);

      showNotification("Successfully logged out!", "success");
    } catch (error) {
      showNotification("Invalid username or password!", "error");
      console.log(error);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
            hideLogin={() => setLoginVisible(false)}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">Save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification
        message={notification.message}
        type={notification.type}
      />

      {!user && loginForm()}
      {user && (
        <div>
          <p className="user-display">
            Logged in as {user.name} <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable
            buttonLabel="+ Add Note"
            ref={noteFormRef}
          >
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <div className="important-button">
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? "Important" : "All"}</button>
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
  );
};

export default App;
