export default function Countries({ filteredCountries }) {
  console.log("Returning countries: ", filteredCountries);
  return (
    <div className="country-list">
      {filteredCountries.map((country) => (
        <p key={country.cca2}>{country.name.common}</p>
      ))}
    </div>
  );
}
