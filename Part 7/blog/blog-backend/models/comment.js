import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export default mongoose.model("Comment", commentSchema);
