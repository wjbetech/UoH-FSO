import { useState } from "react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const [addBook] = useMutation(ADD_BOOK, {
    // refetch ALL_BOOKS if you want to refresh the actual list of books
    // - refetching ADD_BOOK does nothing at all here
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Adding Book: ", { title, author, published, genres });
    await addBook({ variables: { title, author, published: Number(published), genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");

    navigate("/books");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h1>New Book Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <label id="genres-label">Genres</label>
        <div className="genres-section">
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            Add Genre
          </button>
        </div>
        {genres.length ? (
          <div className="genres-list">Genres: {genres.length > 1 ? genres.join(", ") : genres}</div>
        ) : (
          <p>Genres: No genres added yet!</p>
        )}
        <button className="add-book-button" type="submit">
          Create Book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
