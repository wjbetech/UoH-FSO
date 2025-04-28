import patients from "../data/patients";
import { NewPatientEntry, PatientEntry } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};
