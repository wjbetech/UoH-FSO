// we no longer need the http modules from node
// import and use express instead
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import notesRouter from "./controllers/notes.js";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";
import "express-async-errors";

const app = express();

const { unknownEndpoint, errorHandler } = middleware;

// mongoose strictQuery
mongoose.set("strictQuery", false);

logger.info("Connecting to: ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB Notes DB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB Notes DB: ", error.message);
  });

// init the express json-parser
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

// fetch a specificied note
app.use("/api/notes", notesRouter);

// catch unknown endpoints - last before error handler middleware!
app.use(unknownEndpoint);

// make sure that error handling middleware appears AFTER
// all routes and other middleware
app.use(errorHandler);

export default app;
