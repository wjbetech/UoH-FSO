import express, { Request, Response } from "express";
import ssnService from "../services/ssnService";
import patientService from "../services/patientService";
import { NewPatientEntry, NonSensitivePatientData, PatientEntry } from "../types/types";
import newPatientParser from "../middleware/parser";
import errorMiddleware from "../middleware/errors";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching patients on the router: / ");

  res.send(ssnService.getNonSensitivePatients());
});

patientsRouter.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    console.log("attempting to add a new patient: ", req.body);

    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
