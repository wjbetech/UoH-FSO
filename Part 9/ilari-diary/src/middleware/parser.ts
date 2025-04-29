import { NextFunction, Request, Response } from "express";
import { newEntrySchema } from "../utils/utils";

const newFlightLogParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default newFlightLogParser;