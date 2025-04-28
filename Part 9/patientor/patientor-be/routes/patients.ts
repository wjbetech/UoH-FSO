import express, { Response } from "express";
import ssnService from "../services/ssnService";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/utils";
import { NonSensitivePatientData } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching patients on the router: / ");

  res.send(ssnService.getNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  console.log("attempting to add a new patient: ", req.body);
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    const errorMessage = "Something went wrong in patientsrouter.post!";
    if (error instanceof Error) {
      console.error(errorMessage, error.message);
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
