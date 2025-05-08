import { Gender, NewPatientEntry, HealthCheckRating } from "../types/types";
import { z } from "zod";
import { isValidDateString } from "./dateValidator";

export const NewPatientSchema = z.object({
  name: z.string().min(5),
  dateOfBirth: isValidDateString,
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(3)
});

const NewBaseEntrySchema = z.object({
  date: isValidDateString,
  specialist: z.string().min(5),
  description: z.string().min(15),
  diagnosisCodes: z.array(z.string()).optional()
});

const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: isValidDateString,
    criteria: z.string().min(8)
  })
});

const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(3),
  sickLeave: z
    .object({
      startDate: isValidDateString,
      endDate: isValidDateString
    })
    .optional()
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema
]);

export type NewHealthCheckEntry = z.infer<typeof NewHealthCheckEntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};

// might be redundant now we are using discriminatedUnion
export const validateEntry = (entry: unknown): NewEntry => {
  try {
    return NewEntrySchema.parse(entry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
    } else {
      console.error("Unknown validation error occurred!", error);
    }
    throw error;
  }
};
