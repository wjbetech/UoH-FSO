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

const create = async (blogData, authToken) => {
  const config = {
    headers: { Authorization: authToken },
  };

  console.log("Creating blog with data:", blogData);
  console.log("And authorization:", authToken);

  try {
    const response = await axios.post(baseUrl, blogData, config);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.status, error.response?.data);
    throw error;
  }
};

const update = async (id, newObject, config) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const remove = async (id, authToken) => {
  const config = {
    headers: { Authorization: authToken },
  };

  console.log("Making delete request to:", `${baseUrl}/${id}`);
  console.log("With authorization:", authToken);

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(
      "API error during delete:",
      error.response?.status,
      error.response?.data,
    );
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
