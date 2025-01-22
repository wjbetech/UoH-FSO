import Note from "../models/note.js";

const initialNotes = [
  {
    content: "HTML is easy",
    important: false
  },
  {
    content: "CSS is hard",
    important: true
  }
];

const nonExistingId = async () => {
  const note = new Note({ content: "removethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const getNotesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

export default { initialNotes, nonExistingId, getNotesInDb };
