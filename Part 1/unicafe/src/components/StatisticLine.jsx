const StatisticLine = ({ text, value }) => {
  console.log(text, value);

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};

export default StatisticLine;
