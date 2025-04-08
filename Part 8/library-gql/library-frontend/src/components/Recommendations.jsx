import { useQuery } from "@apollo/client";

export const Recommendations = () => {
  
  const [results] = useQuery()
  
  return (
    <div className="container">
      <h2>Recommendations</h2>
      <p>Here are recommendations based on your favorite genre!</p>
    </div>
  );
};
