import React from "react";

export default function AnecdoteList({ anecdotes, addVote }) {
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
    </div>
  );
}
