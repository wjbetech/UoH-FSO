import { useState } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import useField from "./hooks/useField.js";

const padding = {
  padding: "4px",
};

const margin = {
  margin: "4px",
};

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>
        <strong>Author:</strong> {anecdote.author}
      </p>
      <p>
        <strong>Votes:</strong> {anecdote.votes}
      </p>
      <p>
        <strong>More Info:</strong> <a href={anecdote.info}>{anecdote.info}</a>
      </p>
      <button onClick={() => vote(anecdote.id)}>Vote</button>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link style={padding} to={`/anecdotes/${anecdote.id}`} key={anecdote.id}>
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous, anecdotes
      differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more
      general than the brief tale itself, such as to characterize a person by delineating a specific quirk or trait, to
      communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. An
      anecdote is &quot;a story with a point.&quot;
    </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div style={{ position: "fixed", bottom: 0, left: 0, backgroundColor: "lightgray", width: "100%", padding: "12px" }}>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div style={{ padding: "8px", border: "1px solid black", marginBottom: "12px" }}>
      <p>Added new anecdote: {notification}</p>
    </div>
  );
};

const CreateNew = (props) => {
  // give each field distinct reset prop & then spread field props
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const navigate = useNavigate();

  // rebuild handleReset on those renamed individual reset funcs
  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    // pass the handleReset only into the handleSubmit func
    handleReset();
    navigate("/");
  };

  return (
    <div style={padding}>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div style={padding}>
          Content
          <input style={margin} {...content} />
        </div>
        <div style={padding}>
          Author
          <input style={margin} {...author} />
        </div>
        <div style={padding}>
          URL
          <input style={margin} {...info} />
        </div>

        {/* need to handle button types here as they default to submit inside a form! */}
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          <button type="submit">Create</button>
          <button type="button" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? anecdotes.find((a) => a.id === Number(match.params.id)) : null;

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(anecdote.content);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = (anecdote) => anecdotes.find((a) => a.id === Number(anecdote));

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software Anecdotes</h1>

      {notification && <Notification notification={notification} />}

      {/* link html elements and url updaters */}
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/createNew">
          Create New
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>

      <Routes>
        <Route path="/createNew" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} vote={vote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
