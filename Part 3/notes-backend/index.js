// we no longer need the http modules from node
// import and use express instead
import express from "express";
import morgan from "morgan";
import cors from "cors";

// import our Note mongoose module
import Note from "./models/note.js";

// import middleware
import errorHandler from "./middleware/errorHandler.js";

// init our express app
const app = express();

// init the express json-parser
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(morgan("tiny"));

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

// fetch a specificied note
app.get("/api/notes/:id", (req, res, next) => {
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
app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({ error: "No content was provided!" });
  }

  const newNote = new Note({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: body.important || false
  });

  newNote
    .save()
    .then((savedNote) => {
      console.log("New note:", newNote.content, "was added successfully!");
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

// update a resource(note)
app.put("/api/notes/:id", (req, res, next) => {
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
app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

//
// // home page
// app.get("/", (req, res) => {
//   res.send(`
//     <h1>My Notes App</h1>
//     <a href="/notes">View Notes</a>
//     `);
// });
//
// // all notes page
// app.get("/notes", (req, res) => {
//   res.send(`
//     <h1>My Notes</h1>
//     <ul>
//       ${notes
//         .map((note) => {
//           return `<li>${note.content}</li>`;
//         })
//         .join("")}
//     </ul>
//     <a href="/">Back</a>
//     `);
// });
//
// // page for one note JSON
// app.get("/api/notes/:id", (req, res) => {
//   const noteId = req.params.id;
//   const note = notes.find((n) => n.id === noteId);
//
//   if (note) {
//     res.json(note);
//   } else {
//     res.status(404);
//     res.send(`
//       <h1>No such note of id ${noteId} was found!</h1>
//       `);
//   }
// });
//
// // page for all notes JSON
// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });
//
// // add a new resource(note)
// app.post("/api/notes", (req, res) => {
//   // append body to the request
//   const body = req.body;
//
//   // error out if no content appended (empty req)
//   if (!body.content) {
//     return res.status(400).json({
//       error: "No content!"
//     });
//   }
//
//   // build our new note
//   const newNote = {
//     content: body.content,
//     important: body.important || false,
//     id: uuidv4()
//   };
//
//   // append, log, return response
//   notes = notes.concat(newNote);
//   console.log("Adding ", newNote, " to notes.");
//   res.json(newNote);
// });
//
// // delete a resource(note)
// app.delete("/api/notes/:id", (req, res) => {
//   const noteId = req.params.id;
//   notes = notes.filter((n) => n.id !== noteId);
//   S;
//   res.status(204).end();
// });

// make sure that error handling middleware appears AFTER
// all routes and other middleware
app.use(errorHandler);

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
