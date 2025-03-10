import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests.js";
import axios from "axios";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"]
      });
    }
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"]
      });
    }
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({
      content,
      votes: 0
    });
    notificationDispatch({ type: "SET_NOTIFICATION", notification: `You added "${content}"!` });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    });
    notificationDispatch({ type: "SET_NOTIFICATION", notification: `You voted for "${anecdote.content}"!` });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const anecdotes = result.data;

  if (!anecdotes) {
    return <div>anecdote service not available due to problems in the server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
