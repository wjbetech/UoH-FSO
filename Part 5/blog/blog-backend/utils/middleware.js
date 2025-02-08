import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

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
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({
      error: "Malformed ID!"
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message
    });
  } else if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return res.status(400).send({
      error: "expected `username` to be unique"
    });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({
      error: "Invalid token!"
    });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token has expired. Please log in again."
    });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "Unknown endpoint!"
  });
};

const tokenExtractor = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header provided" });
    }

    // extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Malformed authorization header" });
    }

    // assign the token to the request object
    req.token = token;
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    logger.error("Error extracting token: ", error);
    return res.status(500).json({ error: "Token could not be extracted!" });
  }
};

const userExtractor = async (req, res, next) => {
  try {
    // verify the token
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "Invalid auth token" });
    }

    // verify the user against the token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: "No user was found" });
    }

    // pass validated user back to req.user
    req.user = user;
    next();
  } catch (error) {
    logger.error("Error extracting user: ", error);
    return res.status(500).json({ error: "The user could not be extracted!" });
  }
};

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
