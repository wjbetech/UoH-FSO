import { NextFunction, Request, Response } from "express";
import { NewPatientSchema } from "../utils/utils";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default newPatientParser;
