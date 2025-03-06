import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { notificationThunk } from "../reducers/notificationReducer.js";
import initialAnecdotes from "../db.json";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = initialAnecdotes;

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // reducer for handling adding votes
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);

      if (anecdote) {
        anecdote.votes += 1;
      }
    },

    // reducer for handling adding new anecdotes
    createAnecdote(state, action) {
      state.push(action.payload);
    },

    // reducer for handling notifications
    notificationReducer(state, action) {
      const notification = action.payload;
    },

    // reducer to append DB anecdotes
    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    // clean up dispatching multiple actions -
    // new action to directly replace the anecdotes array
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.newAnecdote(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(notificationThunk(`New anecdote added: "${newAnecdote.content}"`));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteThunk = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState();
    const anecdoteToVote = anecdotes.find((a) => a.id === id);

    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    };

    await anecdoteService.updateAnecdote(id, updatedAnecdote);

    dispatch(voteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
