import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries/queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS, {
    fetchPolicy: "network-only"
  });

  console.log("Books component useQuery result: ", result)

  if (result.loading) {
    return <div>Loading...</div>;
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
              <td>{a.author}</td>
              <td id="published">{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
