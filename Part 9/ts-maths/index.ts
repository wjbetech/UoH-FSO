import express from "express";
import { calculate } from "./lib/calculator";
// import multiply from "./lib/multiply";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong!");
});

app.post("/calculate", (req, res) => {
  const { value1, value2, operation } = req.body;

  const result = calculate(value1, value2, operation);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
