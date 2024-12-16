import { useState } from "react";

const App = () => {
  // I tested placing this outside of the actual App component function and
  // it still worked, so not 100% sure off the top of my head the implications of
  // defining it here vs outside the actual App component function
  // -- might move to JSON file if the course doesn't do it, it hurts me
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // debugger:
  // console.log(selected, votes);

  const handleLikeAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const handleNewAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <h3>{anecdotes[selected]}</h3>
      <p>This anecdote has {votes[selected]} likes</p>
      <div>
        <button onClick={handleLikeAnecdote}>Like</button>
        <button onClick={handleNewAnecdoteClick}>Next Anecdote</button>
      </div>
    </div>
  );
};

export default App;
