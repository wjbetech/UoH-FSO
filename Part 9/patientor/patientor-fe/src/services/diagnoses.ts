import axios from "axios";
import { Diagnosis } from "../types/types";
import { apiBaseUrl } from "../utils/constants";

export const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default getAllDiagnoses;
