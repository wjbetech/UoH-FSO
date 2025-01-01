import axios from "axios";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const getCityWeather = async (capitalCity) => {
  const response = await axios.get(`${baseURL}${capitalCity}&units=metric&appid=${API_KEY}`);
  return response.data;
};

export default getCityWeather;
