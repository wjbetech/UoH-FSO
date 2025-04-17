import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES, ADD_BOOK } from "../queries/queries";

// just adding a commit to push a new comment

const Books = () => {
  const [genreFilter, setGenreFilter] = useState("");

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter || null } // normalize empty string to null
  });

  const { data } = useQuery(ALL_GENRES, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_GENRES }, { query: ADD_BOOK }]
  });

  const genreOptions = data ? data.allGenres : [];

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    console.error("GraphQL Errors:", result.error.graphQLErrors);
    console.error("Network Error:", result.error.networkError);
    return (
      <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        Error loading books, details: {result.error.message}
      </div>
    );
  }

  if (!result.data || !result.data.allBooks) {
    console.error("No data received, and no error!", result);
    return <div>No book data available.</div>;
  }

  // create a new Set from a flattened array containing all genres found
  // flatMap creates a new array that contains all found elements (genres)
  // const genres = Array.from(new Set(result.data?.allBooks.flatMap((book) => book.genres)));

  // Apollo Client's result.data is read-only!
  // simply sorting the books variable we created won't work, the app will scream
  const books = [...result.data.allBooks].sort((a, b) => b.published - a.published);

  return (
    <div className="container">
      <h2>Books</h2>
      <div style={{ height: "30px", fontStyle: "italic", color: "rgba(0, 0, 0, 0.5)" }}>
        {genreFilter && <p>Currently filtering by: {genreFilter}</p>}
      </div>

      <table>
        <tbody>
          <tr className="table-header">
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td id="published">{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Sort by Genre</h3>
      <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
        <option value="">All genres</option>
        {genreOptions.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Books;
