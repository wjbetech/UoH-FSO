import express from "express";
import Note from "../models/note.js";

const notesRouter = express.Router();

// now we use ASYNC/AWAIT syntax, so this:
// notesRouter.get("/", (req, res, next) => {
//   Note.find({})
//     .then((note) => {
//       if (note) {
//         res.json(note);
//       } else {
//         res.status(404).json({ error: "Could not fetch notes!" });
//       }
//     })
//     .catch((error) => next(error));
// });
// will become this -->
notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

// fetch a specificied note
notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// add a new note
notesRouter.post("/", async (req, res) => {
  console.log("Request body: ", req.body);
  const { content, important } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content was provided!" });
  }

  const note = new Note({
    content: content,
    important: important || false
  });

  const savedNote = await note.save();
  res.status(201).json(savedNote);
});

// update a resource(note)
notesRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important
  };

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true });
  res.json(updatedNote);
});

// delete a resource(note)
notesRouter.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default notesRouter;
