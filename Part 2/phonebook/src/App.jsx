import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  // only used to control the form input element
  const [newName, setNewName] = useState("");

  const handleChange = (event) => {
    console.log(newName);
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <p>{person.name}</p>
        </div>
      ))}
      {/* <div style={{ marginTop: "64px" }}>
        <h5>Debugger:</h5>
        <p>{newName}</p>
      </div> */}
    </div>
  );
};

export default App;
