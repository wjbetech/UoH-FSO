import React from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer.js";
import { createAnecdote } from "../reducers/anecdoteReducer";

import anecdoteService from "../services/anecdotes";

export default function AnecdoteForm(props) {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification(`New anecdote added: "${anecdote}"`));
  };

  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
