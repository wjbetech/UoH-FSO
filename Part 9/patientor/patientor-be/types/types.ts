import { z } from "zod";
import { NewPatientSchema } from "../utils/utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}
