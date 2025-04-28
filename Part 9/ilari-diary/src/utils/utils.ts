import { NewFlightLogEntry } from "../types/types";
import { parseComment, parseDate, parseWeather, parseVisibility } from "./typeGuards";

const toNewFlightLogEntry = (object: unknown): NewFlightLogEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data: " + object);
  }

  if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
    const newFlightLog: NewFlightLogEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };

    return newFlightLog;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewFlightLogEntry;
