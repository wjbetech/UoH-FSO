import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../queries/queries";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phone,
        street,
        city
      }
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone: <input type="text" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          Street: <input type="text" value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          City: <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonForm;
