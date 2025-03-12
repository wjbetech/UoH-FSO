import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (content) => {
  if (content.length < 5) {
    throw new Error("Anecdote must be at least 5 characters long!");
  }

  const newAnecdote = { content, votes: 0 };

  const response = await axios.post(baseUrl, newAnecdote);
};

export const updateAnecdote = (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then((res) => res.data);
