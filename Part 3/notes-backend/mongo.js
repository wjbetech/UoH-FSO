import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Please give password as argument!");
  process.exit(1);
}

const password = process.argv[2];

// if file is not working CHECK THE MONGODB PASSWORD IN THIS URL!!!
const url = `mongodb+srv://wjbetech:{myMongoDBPassword}@fso.ulb4k.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fso`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

Note.find({
  // insert search parameters to filter by here
  // important:
}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// const note = new Note({
//   content: "Mongoose makes things easier",
//   important: false
// });
//
// note.save().then((result) => {
//   console.log("Note saved!", result);
//   mongoose.connection.close();
// });
