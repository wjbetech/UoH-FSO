import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries/queries";

// components
import PersonsList from "./components/PersonsList";
import PersonForm from "./components/PersonForm";
import PhoneNumberForm from "./components/PhoneNumberForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  // pollInterval is one potential solution for updating the cache
  // when a new contact is created
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  // setting the notification message
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  // defining the Notify component to render the message
  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  };

  const persons = result.data.allPersons;

  return (
    <div>
      <h1>Phonebook-gql</h1>
      <p>This is the demo GraphQL Phonebook app from the FullstackOpen course by UoH, Finland.</p>
      <Notify errorMessage={errorMessage} />
      <PersonsList persons={persons} />
      <div>
        <PersonForm setError={notify} />
      </div>
      <PhoneNumberForm />
    </div>
  );
};

export default App;
