import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_BOOKS } from "../queries/queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  console.log("Books component useQuery result: ", result);

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

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
    </div>
  );
};

export default Books;
