import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    // reducer for handling notes
    createNote(state, action) {
      state.push(action.payload);
    },

    // reducer for handling importance toggle
    toggleImportance(state, action) {
      const id = action.payload;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };

      return state.map((note) => (note.id !== id ? note : changedNote));
    },

    // reducer for appending notes to the notes list in state
    appendNote(state, action) {
      state.push(action.payload);
    },

    setNotes(state, action) {
      return action.payload;
    }
  }
});

export const { createNote, toggleImportance, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
