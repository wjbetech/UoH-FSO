import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AnecdoteList(props) {
  const dispatch = useDispatch();

  // I'm not 100% sure that I need to 'destructure' the Redux store like this, but
  // for now it is working - a quick google shows it is considered relatively
  // good practice.
  const storeAnecdotes = useSelector((state) => state.anecdotes);
  const storeFilter = useSelector((state) => state.filter);

  const addVote = (id) => {
    dispatch(
      voteAnecdote({
        id
      })
    );
  };

  console.log("storeAnecdotes: ", storeAnecdotes);
  console.log("storeFilter: ", storeFilter);

  const filteredAnecdotes = storeAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(storeFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Likes: {anecdote.votes}</div>
          <button onClick={() => addVote(anecdote.id)}>vote</button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
