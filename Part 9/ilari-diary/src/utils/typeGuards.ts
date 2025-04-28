import { Visibility, Weather } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment detected via parseComment type guard!");
  }

  return comment;
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

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather detected via parseWeather type guard!");
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  // can now remove !visibility check
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility detected via parseVisibility type guard!: " + visibility);
  }
  return visibility;
};
