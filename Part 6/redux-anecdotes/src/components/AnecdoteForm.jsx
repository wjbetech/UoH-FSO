import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { addNewAnecdote } from "../reducers/anecdoteReducer.js";
import { showNotification } from "../reducers/notificationReducer.js";

export default function AnecdoteForm(props) {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(addNewAnecdote(anecdote));
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
