import { useEffect } from "react";
import useResource from "./hooks/useResource.jsx";
import useField from "./hooks/useField.jsx";

const App = () => {
  const [resources, resourceService] = useResource("http://localhost:3005");

  const noteContent = useField("text");
  const personName = useField("text");
  const personNumber = useField("text");

  // this doesn't quite work as I want - passing in the requested resourceService causes
  // the useEffect to trigger repeatedly
  // (and also writing comments seems to as well?)
  useEffect(() => {
    resourceService.getNotes();
    resourceService.getPersons();
  }, []);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (noteContent.value.trim()) {
      resourceService.create("notes", { content: noteContent.value });
      noteContent.onChange({ target: { value: "" } });
    }
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    if (personName.value.trim() && personNumber.value.trim()) {
      resourceService.create("persons", { name: personName.value, number: personNumber.value });
      personName.onChange({ target: { value: "" } });
      personNumber.onChange({ target: { value: "" } });
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input
          {...noteContent}
          placeholder="New note"
        />
        <button type="submit">Create</button>
      </form>
      {resources.notes.map((note) => (
        <p key={note.id}>{note.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <input
          {...personName}
          placeholder="Name"
        />
        <input
          {...personNumber}
          placeholder="Number"
        />
        <button type="submit">Create</button>
      </form>
      {resources.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
