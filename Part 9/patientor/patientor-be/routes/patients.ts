import express, { Response } from "express";
import ssnService from "../services/ssnService";
import { NonSensitivePatientData } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching patients on the router: / ");

  res.send(ssnService.getNonSensitivePatients());
});

export default patientsRouter;
