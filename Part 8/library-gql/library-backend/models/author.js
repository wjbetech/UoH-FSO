import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  born: {
    type: Number
  }
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
