import { useState, useEffect } from "react";
import Person from "./components/Person";
import Toast from "./components/Toast";
import personService from "./services/persons";
import { v4 as uuidv4 } from "uuid";
// import normalizeName from "./utils/textSanitizier";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });
  const [filterItem, setFilterItem] = useState("");
  const [toast, setToast] = useState({
    message: "",
    status: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value
    });
  };

  const handleFilterChange = (event) => {
    setFilterItem(event.target.value);
  };

  const filteredNames = persons.filter((p) => p.name.toLowerCase().includes(filterItem.toLowerCase()));

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await personService.getAllPeople();
      setPersons(persons);
    };
    fetchPersons();
  }, []);

  const showToast = (message, status) => {
    setToast({ message, status });
    setTimeout(() => {
      setToast({ message: "", status: "" });
    }, 5000);
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: uuidv4()
    };

    if (persons.find((person) => person.name === newPersonObject.name)) {
      if (
        !window.confirm(
          `${newPersonObject.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      } else {
        const personToUpdate = persons.find((person) => person.name === newPersonObject.name);
        const updatedPerson = {
          ...personToUpdate,
          number: newPersonObject.number
        };

        try {
          await personService.updatePerson(personToUpdate.id, updatedPerson);
          setPersons(persons.map((person) => (person.id === personToUpdate.id ? updatedPerson : person)));
          showToast(`${updatedPerson.name}'s number was updated!`, "success");
        } catch {
          showToast(
            `${newPersonObject.name} has already been removed from the phonebook! Please check the phonebook and try again.`,
            "error"
          );
          const updatedPersons = await personService.getAllPeople();
          setPersons(updatedPersons);
        }
        return;
      }
    }

    try {
      const newPersonResponse = await personService.addPerson(newPersonObject);
      setPersons(persons.concat(newPersonResponse));
      showToast(`${newPersonResponse.name} successfully added!`, "success");
    } catch {
      showToast(`Failed to add ${newPerson.name}`, "error");
    }

    setNewPerson({ name: "", number: "" });
  };

  const handleDeletePerson = async (id) => {
    try {
      const personToDelete = persons.find((person) => person.id === id);
      if (!window.confirm(`Delete ${personToDelete.name}?`)) {
        return;
      }

      await personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
      showToast(`${personToDelete.name} deleted successfully!`, "success");
    } catch {
      showToast(`Could not delete the person!`, "error");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {toast.message && toast.status && (
        <Toast
          message={toast.message}
          status={toast.status}
        />
      )}
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
      <label htmlFor="filter">Filter By: </label>
      <input
        value={filterItem}
        onChange={handleFilterChange}
        type="text"
        name="filter"
      />
      {filteredNames.map((person) => (
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
