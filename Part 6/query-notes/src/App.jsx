import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, createNote } from "./requests.js";

const App = () => {
  const newNoteMutation = useMutation({
    mutationFn: createNote
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutateAsync({ content, important: true });
  };

  const toggleImportance = (note) => {
    console.log("toggle importance of", note.id);
  };

  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => toggleImportance(note)}
        >
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
