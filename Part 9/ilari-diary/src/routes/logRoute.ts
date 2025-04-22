import express, { Response } from "express";
import flightLogService from "../services/flightLogService";
import { NonSensitiveLogEntry, FlightLogEntry, NewFlightLogEntry } from "../types/types";

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
  const { date, weather, visibility, comment } = req.body;
  const newLogEntry = flightLogService.addFlightLog({ date, weather, visibility, comment });
  res.json(newLogEntry);
});

export default router;
