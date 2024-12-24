import { useState, useEffect } from "react";
import Person from "./components/Person";
import Toast from "./components/Toast";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await personService.getAllPeople();
      setPersons(persons);
    };
    fetchPersons();
  }, []);

  const addPerson = async (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.number,
      // making these strings just because the code provided to start
      // this task was using strings for ids
      // -- this is actually a pretty bad solution for creating ids though
      // because if you are deleting/creating entries you will quite quickly
      // trip over items trying to have the same key
      // -- easily fixed with uuid or even simple Math.random
      id: new String(persons.length + 1)
    };

    // see if name already exists in phonebook
    if (persons.find((person) => person.name === newPersonObject.name)) {
      // ask user if they want to replace the number with the new number provided
      if (
        !window.confirm(
          `${newPersonObject.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      } else {
        // find the existing object with the same name
        const personToUpdate = persons.find((person) => person.name === newPersonObject.name);
        // create the object by spreading the old object but update the number
        const updatedPerson = { ...personToUpdate, number: newPersonObject.number };
        // pass the ID and new person object to the updatePerson service
        personService.updatePerson(personToUpdate.id, updatedPerson);
        // setPersons iterates over persons again and replaces the old person with new
        // and leaves the rest as they were, "person"
        setPersons(persons.map((person) => (person.id === personToUpdate.id ? updatedPerson : person)));
        return;
      }
    }

    const newPersonResponse = await personService.addPerson(newPersonObject);
    setPersons(persons.concat(newPersonResponse));
    // add a timeout message to say a person was added
    setToast(`${newPersonResponse.name} successfully added!`);
    setTimeout(() => {
      setToast(null);
    }, 5000);

    setNewPerson({ name: "", number: "" });
  };

  const handleDeletePerson = async (id) => {
    try {
      // get the person to delete
      const personToDelete = persons.find((person) => person.id === id);

      // comfy c.log to see what we are deleting
      console.log(`Attempting to delete ${personToDelete.name}`);

      // confirm deleting, return out of handleDelete on cancel
      if (!window.confirm(`Delete ${personToDelete.name}?`)) {
        return;
      }

      // try to delete on backend
      await personService.deletePerson(id);

      // remove person from state - triggering re-render
      setPersons(persons.filter((person) => person.id !== id));

      // log success
      console.log(`${personToDelete.name} deleted successfully!`);
    } catch (error) {
      alert("Could not delete that person! Check code and try again.");
      console.log("Could not delete a person: ");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {toast ? <Toast toast={toast} /> : ""}
      <form onSubmit={addPerson}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            value={newPerson.name}
            onChange={handleChange}
          />
          <label htmlFor="number">Number: </label>
          <input
            name="number"
            value={newPerson.number}
            onChange={handleChange}
          />
        </div>
        <button
          className="form-button"
          type="submit"
        >
          Add Person
        </button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={handleDeletePerson}
        />
      ))}
    </div>
  );
};

export default App;
