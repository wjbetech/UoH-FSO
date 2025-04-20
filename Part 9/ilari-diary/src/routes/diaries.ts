import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("all diaries route is online!");
});

router.post("/", (_req, res) => {
  res.send("saving a diary...");
});

export default router;
