import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  genres: [{ type: String }]
});

bookSchema.index({ author: 1 });

const Book = mongoose.model("Book", bookSchema);

export default Book;
