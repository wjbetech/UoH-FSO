const StatisticLine = ({ text, value }) => {
  console.log(text, value);

  return (
    <p>
      {text} {value}
    </p>
  );
};

export default StatisticLine;
