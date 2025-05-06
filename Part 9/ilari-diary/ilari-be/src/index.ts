import express from "express";
import cors from "cors";

// routes
import diaryRouter from "./routes/logRoute";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.get("/ping", (_req, res) => {
  console.log("ilari's diary is online!");
  res.send("pong");
});

app.use("/api/flightlogs", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
