import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AnecdoteList(props) {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.anecdotes);

  const addVote = (id) => {
    dispatch(voteAnecdote({
      id
    }))
  }

  const filteredAnecdotes = store.anecdotes.filter(a => a.contains(store.filter(a => store)))

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
