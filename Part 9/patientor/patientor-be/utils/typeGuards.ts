// this file is largely redundant after implementing Zod

// import { Gender } from "../types/types";

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// export const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error("Incorrect or missing name: " + name);
//   }

//   return name;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// export const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date detected via parseDate type guard!");
//   }
//   return date;
// };

// export const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error("Incorrect or missing ssn: " + ssn);
//   }

//   return ssn;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// export const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//     throw new Error("Incorrect or missing gender provided: " + gender);
//   }

//   return gender;
// };

// export const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error("Incorrect or missing occupation provided: " + occupation);
//   }

//   return occupation;
// };
