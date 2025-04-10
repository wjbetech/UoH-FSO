import { useQuery } from "@apollo/client";
import { GET_RECOMMENDATIONS } from "../queries/queries";

const Recommendations = () => {
  const result = useQuery(GET_RECOMMENDATIONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    console.error("GraphQL Errors:", result.error.graphQLErrors);
    console.error("Network Error:", result.error.networkError);
    return (
      <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        Error loading recommendations! Details: {result.error.message}
      </div>
    );
  }

  console.log(result);

  return (
    <div className="container">
      <h2>Recommendations</h2>
      <p>Here are recommendations based on your favorite genre!</p>
      <ul>
        {result.data.recommendations.map((book) => (
          <li key={book.title}>
            {book.title} by {book.author?.name || "Unknown"} ({book.published})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
