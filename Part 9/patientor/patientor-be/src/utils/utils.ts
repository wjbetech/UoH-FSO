import { Gender, NewPatientEntry, Entry, HealthCheckRating } from "../types/types";
import { z } from "zod";
import { isValidDateString } from "./dateValidator";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: isValidDateString,
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const BaseEntrySchema = z.object({
  id: z.string(),
  date: isValidDateString,
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().min(0).max(3)
});

export const NewHealthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: isValidDateString,
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export type NewHealthCheckEntry = z.infer<typeof NewHealthCheckEntrySchema>;

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: isValidDateString,
    criteria: z.string()
  })
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: isValidDateString,
      endDate: isValidDateString
    })
    .optional()
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema
]);

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): Entry => {
  return NewEntrySchema.parse(object);
};
