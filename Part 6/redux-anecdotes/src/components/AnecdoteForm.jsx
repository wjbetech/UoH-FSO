import React from "react";
import { useDispatch } from "react-redux";
import { notificationThunk } from "../reducers/notificationReducer.js";
import { addNewAnecdote } from "../reducers/anecdoteReducer";

import anecdoteService from "../services/anecdotes";

export default function AnecdoteForm(props) {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addNewAnecdote(anecdote));
    dispatch(notificationThunk(`New anecdote added: "${anecdote}"`), 5);
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
