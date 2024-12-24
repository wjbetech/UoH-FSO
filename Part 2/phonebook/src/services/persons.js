import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAllPeople = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const addPerson = async (newPerson) => {
  const response = await axios.post(baseURL, newPerson);
  return response.data;
};

const updatePerson = async (id, newPerson) => {
  const response = await axios.put(`${baseURL}/${id}`, newPerson);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

export default { getAllPeople, addPerson, updatePerson, deletePerson };
