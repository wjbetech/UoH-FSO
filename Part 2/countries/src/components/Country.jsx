export default function Country({ countryDetails }) {
  console.log("Returning single country: ", countryDetails);
  const { name, capital, area, languages, flags } = countryDetails;

  const countryLanguages = Object.values(languages);
  console.log(countryLanguages);

  return (
    <div className="country-details">
      <h1>{name.common}</h1>
      <div className="capital-area">
        <p>Capital City: {capital}</p>
        <p>Area: {area}m2</p>
      </div>
      <div className="languages">
        <h3>Languages: </h3>
        <ul>
          {countryLanguages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <img
        src={flags.png}
        alt=""
      />
    </div>
  );
}
