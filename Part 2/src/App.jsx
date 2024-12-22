import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [newNote, setNewNote] = useState("");
  // const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  //   const addNote = (event) => {
  //     event.preventDefault();
  //     const noteObject = {
  //       content: newNote,
  //       important: Math.random() > 0.5,
  //       id: notes.length + 1
  //     };
  //
  //     setNotes(notes.concat(noteObject));
  //     setNewNote("");
  //   };
  //
  //   const handleNoteChange = (event) => {
  //     setNewNote(event.target.value);
  //   };
  //
  //   const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  console.log(persons);

  return (
    <div>
      <h1>People</h1>
      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      </div> */}
      <ul>
        {persons.map((person) => (
          <Persons
            key={person.id}
            person={person}
          />
        ))}
      </ul>
      <form>
        <input />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
