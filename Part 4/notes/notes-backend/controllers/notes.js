import express from "express";
import Note from "../models/note.js";
import User from "../models/user.js";

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
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
notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);
  console.log(user);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
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
