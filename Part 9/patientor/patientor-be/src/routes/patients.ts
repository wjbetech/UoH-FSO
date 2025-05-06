import express, { Request, Response } from "express";
import ssnService from "../services/ssnService";
import patientService from "../services/patientService";
import { NewPatientEntry, NonSensitivePatientData, PatientEntry } from "../types/types";
import newPatientParser from "../middleware/parser";
import errorMiddleware from "../middleware/errors";

const patientsRouter = express.Router();

// get all patient info
patientsRouter.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching patients on the router: / ");

  res.send(ssnService.getNonSensitivePatients());
});

// get specific patient info
patientsRouter.get("/:id", (req, res: Response<NonSensitivePatientData>) => {
  const id = req.params.id;
  console.log(`Fetching patient of id: ${id}`);

  res.send(ssnService.getNonSensitivePatient(id));
});

// add a new patient
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
