import { useState, useEffect } from "react";
import getCityWeather from "../services/fetchWeather";

export default function Country({ countryDetails }) {
  const [weather, setWeather] = useState(null);

  console.log("Returning single country: ", countryDetails);
  const { name, capital, area, languages, flags } = countryDetails;

  const countryLanguages = Object.values(languages);
  console.log(`Languages of ${name.common}: `, countryLanguages);

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getCityWeather(capital);
      setWeather(weather);
      console.log("Weather in capital: ", weather);
    };
    fetchWeather();

    // Clean up function
    return () => {
      // Cancel any pending requests
      console.log("Cleanup function called");
    };
  }, [capital]);

  const weatherIconURL = weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

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
      {weather && (
        <div className="country-weather">
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp.toFixed(0)}°C</p>
          <img
            src={weatherIconURL}
            alt=""
          />
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
