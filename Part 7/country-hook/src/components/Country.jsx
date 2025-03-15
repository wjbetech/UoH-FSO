const Country = ({ country, isLoading, error }) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return null;
  if (!country.found) return <div>Not found...</div>;

  const {
    name: { common: name },
    capital,
    population,
    flags: { png: flag }
  } = country.data;

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>capital: {country.data.capital[0]}</div>
      <div>population: {country.data.population.toLocaleString()}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`Flag of ${country.data.name.common}`}
      />
    </div>
  );
};

export default Country;
