import { useState, useEffect } from "react";
import getCountries from "./services/fetchCountries";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setCountries(countries);
    };
    console.log(countries);
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => country.name.common.includes(searchCountry));

  return (
    <div>
      <h1>Countries</h1>
      <div className="find-country-input">
        <label htmlFor="find-country">Find Countries:</label>
        <input
          type="text"
          name="find-country"
          placeholder="England"
          value={searchCountry}
          onChange={(e) => {
            setSearchCountry(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
          }}
        />
      </div>
      {filteredCountries && filteredCountries.length > 9 ? (
        <p>Too many countries! Try to be more specific.</p>
      ) : (
        <Countries countries={filteredCountries} />
      )}
      {/* <Countries countries={countries} /> */}
    </div>
  );
}

export default App;
