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
notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// add a new note
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

// update a resource(note)
notesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
  response.json(updatedNote);
});

// delete a resource(note)
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

export default notesRouter;
