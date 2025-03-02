// we no longer need the http modules from node
// import and use express instead
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import loginRouter from "./controllers/login.js";
import notesRouter from "./controllers/notes.js";
import userRouter from "./controllers/users.js";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";
import testRouter from "./controllers/testing.js";

const app = express();

const { unknownEndpoint, errorHandler } = middleware;

// mongoose strictQuery
mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB...");

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

// use controllers
app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

// use controllers/testing.js routing in test mode
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testRouter);
}

// catch unknown endpoints - last before error handler middleware!
app.use(unknownEndpoint);

// make sure that error handling middleware appears AFTER
// all routes and other middleware
app.use(errorHandler);

export default app;
