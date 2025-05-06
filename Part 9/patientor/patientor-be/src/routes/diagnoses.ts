import express, { Response } from "express";
import diagnoses from "../../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response) => {
  console.log("Fetching diagnoses on the router: / ");

  res.send(diagnoses);
});

export default diagnosesRouter;
