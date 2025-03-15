import { useState } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState({
    notes: [],
    persons: []
  });

  const getNotes = async () => {
    const response = await axios.get(`${baseUrl}/notes`);
    setResources((prevResources) => ({
      ...prevResources,
      notes: response.data
    }));
  };

  const getPersons = async () => {
    const response = await axios.get(`${baseUrl}/persons`);
    setResources((prevResources) => ({
      ...prevResources,
      persons: response.data
    }));
  };

  const create = async (type, resource) => {
    const response = await axios.post(`${baseUrl}/${type}`, resource);
    setResources((prevResources) => ({
      ...prevResources,
      [type]: prevResources[type].concat(response.data)
    }));
  };

  const service = {
    getNotes,
    getPersons,
    create
  };

  return [resources, service];
};

export default useResource;
