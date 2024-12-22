import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  // only used to control the form input element
  const [newName, setNewName] = useState("");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // build our new name object
    const newNameObject = {
      name: newName
    };

    // METHOD 1 - return after finding duplicate name
    if (persons.find((p) => p.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already in the phonebook!`);
      return;
    }
    setPersons(persons.concat(newNameObject));
    setNewName("");

    // METHOD 2 - if/else
    // if (persons.find((p) => p.name === newNameObject.name)) {
    //   alert(`${newNameObject.name} is already in the phonebook!`);
    //   return;
    // } else {
    //   setPersons([...persons, newNameObject]);
    //   setNewName("");
    // }

    // NB Can also use .some() or .filter() to get similar/same functionality
    // but remember to opt for performative methods!
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
      {persons.map((person, i) => (
        <div key={i}>
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
