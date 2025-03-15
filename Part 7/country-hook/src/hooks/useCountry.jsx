import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name === "") {
      setCountry(null);
      return;
    }

    const fetchCountry = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
        console.log(response);
        setCountry({
          found: true,
          data: response.data
        });
      } catch (err) {
        setCountry({ found: false });
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  return { country, isLoading, error };
};

export default useCountry;
