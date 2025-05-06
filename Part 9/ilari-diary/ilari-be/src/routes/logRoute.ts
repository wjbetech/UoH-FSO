import express, { Request, Response } from "express";
import flightLogService from "../services/flightLogService";
import { FlightLogEntry, NewFlightLogEntry, NonSensitiveLogEntry } from "../types/types";
import newFlightLogParser from "../middleware/parser";
import { errorMiddleware } from "../middleware/errors";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveLogEntry[]>) => {
  console.log("Fetching all diary entries on the route: / ");

  res.send(flightLogService.getEntries());
});

router.get("/:id", (req, res) => {
  const diary = flightLogService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.status(404).send("Diary entry not found");
  }
});

router.post(
  "/",
  newFlightLogParser,
  (req: Request<unknown, unknown, NewFlightLogEntry>, res: Response<FlightLogEntry>) => {
    const addedFlightLog = flightLogService.addFlightLog(req.body);
    res.json(addedFlightLog);
  }
);

router.use(errorMiddleware);

export default router;
