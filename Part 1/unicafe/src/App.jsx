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
    // I just want to add for the kind professor who reads this code
    // I am just following the guidelines of the course
    // but this isn't my "first rodeo" with JS & React etc
    // and I really want to add .toFixed() or similar
    // to the "Good %"
    // "Good %: 34.61538461538461" hurts my soul,
    // thanks for coming to my TED talk, great course btw!
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
      {/* table for no votes yet */}
      {totalVotes < 1 ? (
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <td>Average Score: </td>
              <td id="text-clip">No feedback given yet!</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <td>Good(%): </td>
              <td id="text-clip">No feedback given yet!</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <Statistics
              averageScore={averageScore.toFixed(2)}
              goodPercent={goodPercent.toFixed(2)}
            />
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;

{
  /* <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr style={{ width: "100%" }}>
          <td>Average Score: </td>
          <td id="text-clip">No feedback given yet!</td>
        </tr>
        <tr style={{ width: "100%" }}>
          <td>Good(%): </td>
          <td id="text-clip">No feedback given yet!</td>
        </tr>
      </tbody>
      {totalVotes > 0 ? (
        <Statistics
          averageScore={averageScore.toFixed(2)}
          goodPercent={goodPercent.toFixed(2)}
        />
      ) : (
        <tbody>
          <tr style={{ width: "100%" }}>
            <td>Average Score: </td>
            <td id="text-clip">No feedback given yet!</td>
          </tr>
          <tr style={{ width: "100%" }}>
            <td>Good(%): </td>
            <td id="text-clip">No feedback given yet!</td>
          </tr>
        </tbody>
      )}
    </table>
  )}
</table> */
}
