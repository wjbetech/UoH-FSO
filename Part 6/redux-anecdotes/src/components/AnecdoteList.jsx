import React from "react";
import { useDispatch, useSelector } from "react-redux";

// make sure that you are using named imports for reducer funcs
import { voteThunk } from "../reducers/anecdoteReducer.js";

import { showNotification } from "../reducers/notificationReducer.js";

export default function AnecdoteList() {
  const dispatch = useDispatch();

  // I'm not 100% sure that I need to 'destructure' the Redux store like this, but
  // for now it is working - a quick google shows it is considered relatively
  // good practice.
  const storeAnecdotes = useSelector((state) => state.anecdotes);
  const storeFilter = useSelector((state) => state.filter);

  console.log("storeAnecdotes: ", storeAnecdotes);
  console.log("storeFilter: ", storeFilter);

  const filteredAnecdotes = storeAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(storeFilter.toLowerCase())
  );

  filteredAnecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteThunk(anecdote.id));
    dispatch(showNotification(`You voted for '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Likes: {anecdote.votes}</div>
          <button onClick={() => handleVote(anecdote)}>vote</button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
