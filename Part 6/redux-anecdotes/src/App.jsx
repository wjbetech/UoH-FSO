import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, createAnecdote } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  // you need to pass the payload as id
  // don't overthink the term "payload", you pass whatever data is needed
  // for the action to be executed, in our case we just need the id
  const addVote = (id) => {
    dispatch(voteAnecdote(id));
  };

  // I think there may be a better way to handle this
  // perhaps by destructuring the '.anecdote.value' value
  // but for now I think this works
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Likes: {anecdote.votes}</div>
          <button onClick={() => addVote(anecdote.id)}>vote</button>
          <br />
          <br />
        </div>
      ))}
      <h2>Add Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
