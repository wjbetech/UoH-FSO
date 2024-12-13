import { useState, useEffect } from "react";
import Statistics from "./components/Statistics";

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [goodPercent, setGoodPercent] = useState(0);

  useEffect(() => {
    let goodScore = good * 1;
    let neutralScore = neutral * 0;
    let badScore = bad * -1;
    setTotalVotes(good + neutral + bad);
    setAverageScore(totalVotes > 0 ? (goodScore + neutralScore + badScore) / (good + neutral + bad) : 0);
    setGoodPercent(totalVotes > 0 ? (good / totalVotes) * 100 : 0);
  }, [good, neutral, bad, totalVotes]);

  return (
    <>
      <h1>Give Feedback!</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <h3>Statistics:</h3>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
      <h3>Part 2 (updated for Part 3):</h3>
      {totalVotes > 0 ? (
        <Statistics
          averageScore={averageScore}
          goodPercent={goodPercent}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

export default App;
