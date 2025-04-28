import { Weather } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment detected via parseComment type guard!");
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date detected via parseDate type guard!");
  }
  return date;
};

const isWeather = (str: string): str is Weather => {
  return ["sunny", "rainy", "cloudy", "stormy", "windy", "snowy"].includes(str);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather detected via parseWeather type guard!");
  }
  return weather;
};

export default { parseComment, parseDate, parseWeather };
