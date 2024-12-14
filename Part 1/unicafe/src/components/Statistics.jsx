import StatisticLine from "./StatisticLine";

const Statistics = ({ averageScore, goodPercent }) => {
  return (
    <div>
      <StatisticLine
        text="Average Score: "
        value={averageScore}
      />
      <StatisticLine
        text="Good %: "
        value={goodPercent}
      />
    </div>
  );
};

export default Statistics;
