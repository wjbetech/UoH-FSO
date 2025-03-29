import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries/queries";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phoneNumber}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const PersonsList = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch
  });

  if (nameToSearch && result.data) {
    return <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />;
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phoneNumber}
          <button onClick={() => setNameToSearch(p.name)}>Show Address</button>
        </div>
      ))}
    </div>
  );
};

export default PersonsList;
