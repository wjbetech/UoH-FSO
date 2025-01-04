// we no longer need the http modules from node
// import and use express instead
import express from "express";
import morgan from "morgan";
const app = express();

// uuid for safe id of new notes
import { v4 as uuidv4 } from "uuid";

// init the express json-parser
app.use(express.json());
app.use(morgan("tiny"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are  the most important methods of HTTP protocol",
    important: true
  }
];

// home page
app.get("/", (req, res) => {
  res.send(`
    <h1>My Notes App</h1>
    <a href="/notes">View Notes</a>
    `);
});

// all notes page
app.get("/notes", (req, res) => {
  res.send(`
    <h1>My Notes</h1>
    <ul>
      ${notes
        .map((note) => {
          return `<li>${note.content}</li>`;
        })
        .join("")}
    </ul>
    <a href="/">Back</a>
    `);
});

// page for one note JSON
app.get("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const note = notes.find((n) => n.id === noteId);

  if (note) {
    res.json(note);
  } else {
    res.status(404);
    res.send(`
      <h1>No such note of id ${noteId} was found!</h1>
      `);
  }
});

// page for all notes JSON
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// add a new resource(note)
app.post("/api/notes", (req, res) => {
  // append body to the request
  const body = req.body;

  // error out if no content appended (empty req)
  if (!body.content) {
    return res.status(400).json({
      error: "No content!"
    });
  }

  // build our new note
  const newNote = {
    content: body.content,
    important: body.important || false,
    id: uuidv4()
  };

  // append, log, return response
  notes = notes.concat(newNote);
  console.log("Adding ", newNote, " to notes.");
  res.json(newNote);
});

// delete a resource(note)
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter((n) => n.id !== noteId);
  S;
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`myNotesApp server running on port ${PORT}`);
