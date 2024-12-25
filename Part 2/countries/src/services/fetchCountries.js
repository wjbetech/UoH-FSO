import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export default getCountries;
