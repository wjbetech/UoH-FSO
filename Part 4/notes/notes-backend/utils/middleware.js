import logger from "./logger.js";

// I actually really like Morgan, although I understand the task here
// is building and understanding middleware.
// I won't be using this for now though.
const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({
      error: "Malformed ID!"
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message
    });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "Unknown endpoint!"
  });
};

export default {
  requestLogger,
  errorHandler,
  unknownEndpoint
};
