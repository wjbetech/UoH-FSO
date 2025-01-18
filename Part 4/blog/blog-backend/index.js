import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import blogRouter from "./controllers/posts.js";
import middleware from "./utils/middleware.js";

const { unknownEndpoint, errorHandler } = middleware;

mongoose.set("strictQuery", false);

const app = express();
// cancel favicon 404
app.get("/favicon.ico", (req, res) => res.status(204));

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = config.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}!`);
});
