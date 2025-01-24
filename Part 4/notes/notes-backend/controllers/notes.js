import express from "express";
import Note from "../models/note.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const notesRouter = express.Router();

const getUserToken = (request) => {
  const auth = request.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "");
    console.log("Extracted Token:", token); // Debugging
    return token;
  }
  console.log("Authorization header missing or invalid"); // Debugging
  return null;
};

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
notesRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log("POSTing new note body:", body);

  // Extract token
  const token = getUserToken(req);
  if (!token) {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  // Verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or expired token!" });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Invalid token!" });
  }

  console.log("Decoded Token:", decodedToken);

  // Find user
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  console.log("User from DB:", user);

  // Create and save note
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  });

  const savedNote = await note.save();
  user.notes = user.notes || [];
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

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
