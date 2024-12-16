import StatisticLine from "./StatisticLine";

const Statistics = ({ averageScore, goodPercent }) => {
  return (
    <>
      <tr>
        <StatisticLine
          text="Average Score: "
          value={averageScore}
        />
      </tr>
      <tr>
        <StatisticLine
          text="Good(%): "
          value={goodPercent}
        />
      </tr>
    </>
  );
};

export default Statistics;
