import { NewFlightLogEntry } from "../types/types";
import { Weather, Visibility } from "../types/types";
import { z } from "zod";
// removed imports: parseComment, parseDate, parseWeather, parseVisibility

const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

export const toNewFlightLogEntry = (object: unknown): NewFlightLogEntry => {
  return newEntrySchema.parse(object);
};

export default toNewFlightLogEntry;
