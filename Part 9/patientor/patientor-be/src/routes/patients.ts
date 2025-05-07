import express, { Request, Response } from "express";
import ssnService from "../services/ssnService";
import patientService from "../services/patientService";
import { NonSensitivePatientData, NewEntry, Entry } from "../types/types";
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
  "/:id/entries",
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry | { error: string }>) => {
    const patientId = req.params.id;
    const newEntry = req.body;

    console.log("Attempting to add a new entry:", newEntry);

    try {
      const addedEntry = patientService.addEntry(patientId, newEntry);
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      res.status(400).send({ error: errorMessage });
    }
  }
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
