import React, { useState, useEffect } from "react";
import Country from "./components/Country.jsx";
import axios from "axios";
import useField from "./hooks/useField.js";
import useCountry from "./hooks/useCountry.jsx";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, isLoading, error } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value); 
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country
        country={country}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default App;
