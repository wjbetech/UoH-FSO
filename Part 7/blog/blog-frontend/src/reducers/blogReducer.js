import { createStore } from "redux";

function blogReducer(state = [], action) {
  switch (action.type) {
    case "INIT_BLOGS":
      return { blogs: action.payload };
    case "ADD_BLOG":
      return { blogs: [...state.blogs, action.payload] };
    default:
      return state;
  }
}

const store = createStore(blogReducer);

store.subscribe(() => console.log(store.getState()));
