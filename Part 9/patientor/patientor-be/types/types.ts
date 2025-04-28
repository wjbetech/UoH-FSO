export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface PatientEntry {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<Patient, "id">;
