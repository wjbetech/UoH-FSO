import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (blogId, commentData) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentData,
    config,
  );

  return res.data;
};

const remove = async (commentId) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${commentId}`, config);

  return res.data;
};

export default { create, remove, setToken };
