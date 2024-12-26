import { useState, useEffect } from "react";
import countriesService from "./services/fetchCountries";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await countriesService.getAllCountries();
      const countryNames = countries.map((country) => country.name.common);
      setCountries(countryNames);
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => country.includes(searchCountry));
  console.log("Filtered countries: " + filteredCountries);

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
      {countries && countries.length > 9 ? (
        <p>Too many countries! Please filter.</p>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
}

export default App;
