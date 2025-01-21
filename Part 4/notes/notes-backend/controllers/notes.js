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
notesRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({ error: "No content was provided!" });
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false
  });

  newNote
    .save()
    .then((savedNote) => {
      console.log("New note:", newNote.content, "was added successfully!");
      res.status(201).json(savedNote);
    })
    .catch((error) => next(error));
});

// update a resource(note)
notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: "query" })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => {
      next(error);
    });
});

// delete a resource(note)
notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

export default notesRouter;
