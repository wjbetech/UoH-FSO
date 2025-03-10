import { useReducer, useContext } from "react";
import { useNotificationValue } from "../AnecdoteContext.jsx";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests.js";

const AnecdoteForm = ({ addAnecdote }) => {
  const anecdote = useNotificationValue();
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
