import { z } from "zod";

export const isValidDateString = z.string().refine(
  (val) => {
    return !isNaN(Date.parse(val));
  },
  {
    message: "Invalid date string"
  }
);
