import express, { Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types/types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  console.log("Fetching all diary entries on the route: / ");

  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("saving a diary...");
});

export default router;
