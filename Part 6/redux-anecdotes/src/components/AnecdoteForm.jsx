import React from "react";
import createAnecdote from "../reducers/anecdoteReducer.js";

export default function AnecdoteForm(props) {
  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
