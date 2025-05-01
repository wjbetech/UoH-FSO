import axios from "axios";
import { NewNote, NoteType } from "../types/types";

const baseUrl = "http://localhost:3001/notes";

export const getAllNotes = async () => {
  return axios.get<NoteType[]>(baseUrl).then((response) => response.data);
};

export const createNote = async (object: NewNote) => {
  return axios.post<NoteType>(baseUrl, object).then((response) => response.data);
};
