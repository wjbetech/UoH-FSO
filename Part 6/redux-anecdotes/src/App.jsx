import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, createAnecdote } from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  // you need to pass the payload as id
  // don't overthink the term "payload", you pass whatever data is needed
  // for the action to be executed, in our case we just need the id
  // id > match id in state to id passed > update [item[id]]
  const addVote = (id) => {
    dispatch(voteAnecdote(id));
  };

  // 1. I think there may be a better way to handle this
  // perhaps by destructuring the '.anecdote.value' value
  // but for now I think this works
  // 2. I am wondering if the addAnecdote func can be moved
  // into the AnecdoteForm component as all the logic for the input
  // can be handled there, but maybe I am wrong? Perhaps it is
  // convention or just because dispatch is extracted here
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <AnecdoteList
        anecdotes={anecdotes}
        addVote={addVote}
      />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
