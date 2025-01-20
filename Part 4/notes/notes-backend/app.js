// we no longer need the http modules from node
// import and use express instead
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./utils/config.js";
import notesRouter from "./controllers/notes.js";
import middleware from "./utils/middleware.js";

const { unknownEndpoint, errorHandler } = middleware;

mongoose.connect(config.MONGODB_URI);

// mongoose strictQuery
mongoose.set("strictQuery", false);

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

export default app;
