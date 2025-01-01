import { useState, useEffect } from "react";
import countriesService from "./services/fetchCountries";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const [loadingError, setLoadingError] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect for gathering all countries on first load
  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const countries = await countriesService.getAllCountries();
        console.log("first useEffect to get countries data: ", countries);
        setCountries(countries);
        console.log("countries state: ", countries);
      } catch (error) {
        setLoadingError(error.message);
        console.error("Error fetching countries: ", error);
      }
    };
    fetchAllCountries();
  }, []);

  // useEffect for specific country data
  useEffect(() => {
    // filter based on input
    const filteredResults = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    );
    setFilteredCountries(filteredResults);
    console.log("Filtered countries: ", filteredResults);
    // fetch detailed info when filteredResults.length === 1
    if (filteredResults.length === 1) {
      const fetchDetails = async () => {
        try {
          setLoading(true);
          const countryDetails = await countriesService.getSearchCountry(filteredResults[0].name.common);
          setCountryDetails(countryDetails);
        } catch (error) {
          setLoadingError(error.message);
          console.error("Error fetching country details: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else {
      setCountryDetails(null);
    }
  }, [countries, searchCountry]);

  const handleSearchCountry = (e) => {
    setSearchCountry(e.target.value);
  };

  console.log("Searching for: ", searchCountry);

  console.log("Filtered countries: ", filteredCountries);

  return (
    <div>
      <h1>Countries</h1>
      <div className="find-country-input">
        <label htmlFor="find-country">Find Countries:</label>
        <input
          type="text"
          name="find-country"
          placeholder="Bulgaria"
          value={searchCountry}
          onChange={handleSearchCountry}
        />
      </div>
      {loadingError && <p>{loadingError}</p>}
      {loading ? (
        <p>Loading country details...</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, please use the filter!</p>
      ) : filteredCountries.length > 1 && filteredCountries.length <= 10 ? (
        <Countries filteredCountries={filteredCountries} />
      ) : filteredCountries.length === 1 && countryDetails ? (
        <Country countryDetails={countryDetails} />
      ) : (
        <p>No matches found. Please try again.</p>
      )}
    </div>
  );
}

export default App;
