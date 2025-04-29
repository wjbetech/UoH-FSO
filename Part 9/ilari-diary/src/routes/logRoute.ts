import express, { Response } from "express";
import flightLogService from "../services/flightLogService";
import { NonSensitiveLogEntry } from "../types/types";
import { z } from "zod";
import { newEntrySchema } from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveLogEntry[]>) => {
  console.log("Fetching all diary entries on the route: / ");

  res.send(flightLogService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = flightLogService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.status(404).send("Diary entry not found");
  }
});

router.post("/", (req, res) => {
  try {
    const newFlightLogEntry = newEntrySchema.parse(req.body);
    const addedFlightLogEntry = flightLogService.addFlightLog(newFlightLogEntry);
    res.json(addedFlightLogEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({
        error: error.issues
      });
    } else {
      res.status(400).send({
        error: "unknown error in the logRouter POST!"
      });
    }
  }
});

export default router;
