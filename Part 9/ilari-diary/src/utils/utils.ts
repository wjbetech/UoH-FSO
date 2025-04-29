import { NewFlightLogEntry } from "../types/types";
import { Weather, Visibility } from "../types/types";
import { z } from "zod";
// removed imports: parseComment, parseDate, parseWeather, parseVisibility

const toNewFlightLogEntry = (object: unknown): NewFlightLogEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data: " + object);
  }

  if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
    const newFlightLog: NewFlightLogEntry = {
      weather: z.nativeEnum(Weather).parse(object.weather),
      visibility: z.nativeEnum(Visibility).parse(object.visibility),
      date: z.string().date().parse(object.date),
      comment: z.string().parse(object.comment)
    };

    return newFlightLog;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewFlightLogEntry;
