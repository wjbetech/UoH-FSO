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
notesRouter.get("", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

// fetch a specificied note
notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        console.log("====================================");
        console.log("Finding note with ID: ", req.params.id);
        console.log("====================================");
        res.json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch((error) => next(error));
});

// add a new note
notesRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({ error: "No content was provided!" });
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

// update a resource(note)
notesRouter.put("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// delete a resource(note)
notesRouter.delete("/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default notesRouter;
