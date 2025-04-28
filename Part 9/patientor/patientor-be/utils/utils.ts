import { NewPatientEntry } from "./../types/types";
import { parseDate, parseGender, parseName, parseOccupation, parseSsn } from "./typeGuards";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data: " + object);
  }

  if ("dateOfBirth" in object && "name" in object && "ssn" in object && "occupation" in object && "gender" in object) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }

  throw new Error("Incorrect data passed in utils/toNewPatiententry func!");
};

export default toNewPatientEntry;
