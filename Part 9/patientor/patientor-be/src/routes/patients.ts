import express, { Request, Response } from "express";
import ssnService from "../services/ssnService";
import patientService from "../services/patientService";
import { NonSensitivePatientData, Entry } from "../types/types";
import { NewEntry, toNewEntry } from "../utils/utils";
import errorMiddleware from "../middleware/errors";
import { z } from "zod";

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
patientsRouter.post<{ id: string }, Entry | { error: string }>(
  "/:id/entries",
  (req: Request<{ id: string }>, res: Response<Entry | { error: string }>) => {
    const patientId = req.params.id;
    console.log(`Adding entry for patient id: ${patientId}`);

    try {
      const newEntry: NewEntry = toNewEntry(req.body);

      const addedEntry = patientService.addEntry(patientId, newEntry);
      res.json(addedEntry);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed:", error.issues);
        res.status(400).json({
          error: error.issues.map((issue) => issue.message).join(", ")
        });
        return;
      }

      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      res.status(400).json({ error: errorMessage });
    }
  }
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
