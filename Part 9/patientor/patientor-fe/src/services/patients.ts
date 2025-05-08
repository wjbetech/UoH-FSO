import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types/types";
import { apiBaseUrl } from "../utils/constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entry: NewEntry): Promise<Entry> => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return data;
};

export default {
  getAll,
  getPatient,
  create,
  addEntry
};
