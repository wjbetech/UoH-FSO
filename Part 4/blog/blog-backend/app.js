// we no longer need the http modules from node
// import and use express instead
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import userRouter from "./controllers/users.js";
import blogRouter from "./controllers/blogs.js";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";

// init our express app
const app = express();

const { unknownEndpoint, errorHandler } = middleware;

// mongoose strictQuery
mongoose.set("strictQuery", false);

// use c.log() logs here because we don't use logger in test mode!
logger.info("Connecting to MongoDB...");

// use c.log() logs here because we don't use logger in test mode!
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    if (process.env.NODE_ENV === "test") {
      logger.info("Connected to MongoDB testBlogApp DB!");
    } else {
      logger.info("Connected to MongoDB blogApp DB!");
    }
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB!");
    logger.error(error);
  });

// init the express json-parser
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// catch unknown endpoints - last before error handler middleware!
app.use(unknownEndpoint);

// make sure that error handling middleware appears AFTER
// all routes and other middleware
app.use(errorHandler);

export default app;
