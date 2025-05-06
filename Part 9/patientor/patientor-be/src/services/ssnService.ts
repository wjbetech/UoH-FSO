import patients from "../../data/patients";
import { Patient } from "../types/types";
import { NonSensitivePatientData } from "../types/types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (id: string): NonSensitivePatientData => {
  const patient = patients.find((patient) => patient.id === id);
  const { ...nonSensitiveData } = patient;
  return nonSensitiveData;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSensitivePatient,
  getNonSensitivePatients
};
