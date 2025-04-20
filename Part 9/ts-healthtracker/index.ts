import express from "express";
import { calculateBmi } from "./lib/bmiCalculator";
import { calculateExercise } from "./lib/exerciseCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  // grab the height and weight from req.query
  const { height, weight } = req.query;

  // Number-fy the values (they are strings by default)
  const heightNum = Number(height);
  const weightNum = Number(weight);

  // validate
  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({
      error: "calculateBmi was called with malformed arguments!"
    });
  }

  // get the return BMI value from validated values
  const bmi = calculateBmi(heightNum, weightNum);

  // print the JSON to the browser
  return res.send({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

app.get("/exercise", (req, res) => {
  const { target, hours } = req.query;

  // check that both parameters exist
  if (!target || !hours) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  const targetNum = Number(target);

  // handle the pesky string/number conversions
  const hoursArray =
    typeof hours === "string"
      ? hours.split(",").map((h) => Number(h))
      : Array.isArray(hours)
      ? hours.map((h) => Number(h))
      : [];

  // validate types
  if (isNaN(targetNum) || hoursArray.some((h) => isNaN(h))) {
    return res.status(400).json({
      error: "malformatted parameters in /exercise GET request!"
    });
  }

  const result = calculateExercise(targetNum, hoursArray);
  return res.json(result);
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/hello`);
});
