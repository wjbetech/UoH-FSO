import React from "react";
import { gql, useQuery } from "@apollo/client";

// components
import PersonsList from "./components/PersonsList";
import PersonForm from "./components/PersonForm"

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  // pollInterval is one potential solution for updating the cache
  // when a new contact is created
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const persons = result.data.allPersons;

  return (
    <div>
      <h1>Phonebook-gql</h1>
      <p>This is the demo GraphQL Phonebook app from the FullstackOpen course by UoH, Finland.</p>
      <PersonsList persons={persons} />
      <div>
        <PersonForm />
      </div>
    </div>
  );
};

export default App;
