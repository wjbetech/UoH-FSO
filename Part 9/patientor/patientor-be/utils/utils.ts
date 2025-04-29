import { Gender, NewPatientEntry } from "./../types/types";
import { z } from "zod";

// these imports are redundant with Zod taking over
// import { parseDate, parseGender, parseName, parseOccupation, parseSsn } from "./typeGuards";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};
