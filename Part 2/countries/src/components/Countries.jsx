import Country from "./Country";
import { useState } from "react";

export default function Countries({ filteredCountries }) {
  const [viewCountry, setViewCountry] = useState(false);

  const handleToggleCountry = (cioc) => {
    setViewCountry((prev) => (prev === cioc ? null : cioc));
  };

  console.log("Returning countries: ", filteredCountries);
  return (
    <div className="country-list">
      {filteredCountries.map((country) => (
        <div
          key={country.cioc}
          className="country"
        >
          <div className="single-country">
            <p>{country.name.common}</p>
            <button onClick={() => handleToggleCountry(country.cioc)}>
              {viewCountry === country.cioc ? "Hide" : "Show"}
            </button>
          </div>
          {viewCountry === country.cioc && (
            <div className="country-view">
              <Country countryDetails={country} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
