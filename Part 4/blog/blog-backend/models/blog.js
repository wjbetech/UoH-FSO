import mongoose from "mongoose";
import "dotenv/config";
import config from "../utils/config.js";
import logger from "../utils/logger.js";

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB 'blogApp' DB...");

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("Connected to: ", result.connection.models);
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB!", error);
  });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 200,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

export default mongoose.model("Blog", blogSchema);
