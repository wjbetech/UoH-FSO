import express from "express";

// routes
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Patientor backend is running on port http://localhost:${PORT}`);
});
