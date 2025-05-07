import patients from "../../data/patients";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  NewEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
  PatientEntry
} from "../types/types";
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

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  let newEntry: Entry;

  switch (entry.type) {
    case "Hospital": {
      const hospitalEntry: HospitalEntry = {
        id: uuidv4(),
        ...(entry as Omit<HospitalEntry, "id">)
      };
      newEntry = hospitalEntry;
      break;
    }

    case "OccupationalHealthcare": {
      const occEntry: OccupationalHealthcareEntry = {
        id: uuidv4(),
        ...(entry as Omit<OccupationalHealthcareEntry, "id">)
      };
      newEntry = occEntry;
      break;
    }

    case "HealthCheck": {
      const healthEntry: HealthCheckEntry = {
        id: uuidv4(),
        ...(entry as Omit<HealthCheckEntry, "id">)
      };
      newEntry = healthEntry;
      break;
    }
  }

  patient.entries = patient.entries || [];
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  addPatient,
  addEntry
};
