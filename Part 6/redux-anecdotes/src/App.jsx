import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Notification from "./components/Notification.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  );
};

export default App;
