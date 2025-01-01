// we no longer need the http modules from node
// import and use express instead
import express from "express";
const app = express();

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
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

app.get("/", (req, res) => {
  res.send(`
    <h1>My Notes App</h1>
    <a href="api/notes">View Notes</a>
    `);
});

app.get("/api/notes", (req, res) => {
  res.send(`
    <h1>My Notes</h1>
    <ul>
      ${notes
        .map((note) => {
          return `<li>${note.content}</li>`;
        })
        .join("")}
    </ul>
    `);
});

const PORT = 3001;
app.listen(PORT);
console.log(`myNotesApp server running on port ${PORT}`);
