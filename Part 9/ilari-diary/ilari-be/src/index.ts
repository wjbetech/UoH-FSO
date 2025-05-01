import express from "express";

// routes
import diaryRouter from "./routes/logRoute";

const app = express();
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
