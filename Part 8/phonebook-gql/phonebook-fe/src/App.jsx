import React, { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_PERSONS, PERSON_ADDED } from "./queries/queries";

// components
import LoginForm from "./components/LoginForm";
import PersonsList from "./components/PersonsList";
import PersonForm from "./components/PersonForm";
import PhoneNumberForm from "./components/PhoneNumberForm";

import updateCache from "./utils/updateCache";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("phonebook-user-token") || "");
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} has been added!`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);

      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(addedPerson)
        };
      });
      console.log("PERSON_ADDED subscription triggered!: ", data);
    }
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("phonebook-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // pollInterval is one potential solution for updating the cache
  // when a new contact is created
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  console.log("ALL_PERSONS result: ", result);

  const persons = result.data.allPersons;

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

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // conditionally render the login form
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}></Notify>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} token={token}></LoginForm>
      </div>
    );
  }

  return (
    <div>
      <h1>Phonebook-gql</h1>
      <p>This is the demo GraphQL Phonebook app from the FullstackOpen course by UoH, Finland.</p>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <PersonsList persons={persons} />
      <div>
        <PersonForm setError={notify} />
      </div>
      <PhoneNumberForm />
    </div>
  );
};

export default App;
