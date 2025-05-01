import { Weather, Visibility } from "../types/types";
import { z } from "zod";
// removed imports: parseComment, parseDate, parseWeather, parseVisibility

export const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});
