const Statistics = ({ averageScore, goodPercent }) => {
  return (
    <div>
      <p>Average Score: {averageScore}</p>
      <p>Good %: {goodPercent}</p>
    </div>
  );
};

export default Statistics;
