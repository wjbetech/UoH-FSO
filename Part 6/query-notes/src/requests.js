import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = () => {
  axios.get("http://localhost:3001/notes").then((res) => res.data);
};

export const createNote = (newNote) => {
  axios.post(baseUrl, newNote).then((res) => res.data);
};
