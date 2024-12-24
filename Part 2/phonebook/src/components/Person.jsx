const Person = ({ person, handleDelete }) => {
  return (
    <div className="person">
      <li>
        {person.name} - {person.number}
      </li>
      <button
        className="delete-button"
        onClick={() => handleDelete(person.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Person;
