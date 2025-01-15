import mongoose from "mongoose";
import "dotenv/config";
import config from "../utils/config.js";

mongoose.set("strictQuery", false);

console.log("Connecting to myNotes MongoDB Database...");

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to: ", result.connection.models);
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB!", error);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model("Note", noteSchema);
