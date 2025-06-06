import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../queries/queries";

import updateCache from "../utils/updateCache";

const PersonForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phoneNumber: phoneNumber.length > 0 ? phoneNumber : undefined,
        street,
        city
      }
    });

    setName("");
    setPhoneNumber("");
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
          Phone Number:{" "}
          <input type="text" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} />
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
