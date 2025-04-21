import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all diary entries on the route: / ");

  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("saving a diary...");
});

export default router;
