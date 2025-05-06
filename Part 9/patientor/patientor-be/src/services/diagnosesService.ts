import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types/types";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
