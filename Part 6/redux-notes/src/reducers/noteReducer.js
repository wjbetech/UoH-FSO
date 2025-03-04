import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2
  }
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // reducer for handling notes
    createNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId()
      });
    },

    // reducer for handling importance toggle
    toggleImportance(state, action) {
      const id = action.payload;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };

      // testing how console.log works inside of Redux/Toolkit
      console.log("current state: ", current(state));

      return state.map((note) => (note.id !== id ? note : changedNote));
    }
  }
});

export const { createNote, toggleImportance } = noteSlice.actions;
export default noteSlice.reducer;
