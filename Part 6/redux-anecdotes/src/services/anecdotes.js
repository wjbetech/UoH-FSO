import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const newAnecdote = async (content, id, votes) => {
  const anecdoteObject = { content, id, votes: 0 };
  const res = await axios.post(baseUrl, anecdoteObject);
  return res.data;
};

export default { getAll, newAnecdote };
