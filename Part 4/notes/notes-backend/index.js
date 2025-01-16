// we no longer need the http modules from node
// import and use express instead
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import notesRouter from "./controllers/notes.js";
import unknownEndpoint from "./middleware/unknownEndpoint.js";

// mongoose strictQuery
mongoose.set("strictQuery", false);

// import middleware
import errorHandler from "./middleware/errorHandler.js";

// init our express app
const app = express();

// init the express json-parser
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(morgan("tiny"));

// fetch a specificied note
app.use("/api/notes", notesRouter);

// catch unknown endpoints - last before error handler middleware!
app.use(unknownEndpoint);

// make sure that error handling middleware appears AFTER
// all routes and other middleware
app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`App listening on port: ${config.PORT}`);
});
