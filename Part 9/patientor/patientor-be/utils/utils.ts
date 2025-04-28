import { NewPatientEntry } from "./../types/types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);

  const newPatient: NewPatientEntry = {
    name: "Val Hippitainen",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6789",
    gender: "female",
    occupation: "Software Engineer"
  };

  return newPatient;
};

export default toNewPatientEntry;
