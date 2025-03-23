import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blogData, config);
  return response.data;
};

const update = async (id, newObject, token) => {
  console.log("Updating blog with id: ", newObject);

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.error(
      "API error during update:",
      error.response?.status,
      error.response?.data,
    );
    throw error;
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
