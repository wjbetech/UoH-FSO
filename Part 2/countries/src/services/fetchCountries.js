import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";
const getAllCountries = async () => {
  const response = await axios.get(`${baseURL}/all`);
  return response.data;
};

const getSearchCountries = async (search) => {
  const response = await axios.get(`${baseURL}/name/${search}`);
  return response.data;
};

export default { getAllCountries, getSearchCountries };
