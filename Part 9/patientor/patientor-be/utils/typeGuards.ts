const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date detected via parseDate type guard!");
  }
  return date;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};

export const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender)) {
    throw new Error("Incorrect or missing gender provided: " + gender);
  }

  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation provided: " + occupation);
  }

  return occupation;
};
