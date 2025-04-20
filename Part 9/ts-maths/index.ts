import express from "express";
import { calculate, Operation } from "./lib/calculator";
// import multiply from "./lib/multiply";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong!");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, operation } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({
      error: "value1 is missing or not a number in calculate()"
    });
  }

  const result = calculate(Number(value1), Number(value2), operation as Operation);

  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
