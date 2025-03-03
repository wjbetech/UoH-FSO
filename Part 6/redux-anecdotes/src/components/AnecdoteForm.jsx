import React from "react";

export default function AnecdoteForm({ addAnecdote }) {
  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
