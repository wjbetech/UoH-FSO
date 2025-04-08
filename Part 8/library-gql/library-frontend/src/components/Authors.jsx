import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from "../queries/queries";

const AuthorsBirthDate = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Updating ${name} with born year: ${born}`);

    await updateAuthorBorn({ variables: { name, born: Number(born) } });

    setBorn(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Born Date</h1>
      <div>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option key={a.name}>{a.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Date</label>
        <input type="number" value={born} onChange={(e) => setBorn(e.target.value)} />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  console.log("Authors component useQuery result: ", result);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    console.error("Error fetching authors!", result.error);
    return <div>Error loading authors, details: {result.error.message}</div>;
  }

  if (!result.data || !result.data.allAuthors) {
    console.error("No data received, and no error!", result);
    return <div>No author data available.</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h1>Authors</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td id="bookCount">{a.authorBookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorsBirthDate authors={authors} />
    </div>
  );
};

export default Authors;
