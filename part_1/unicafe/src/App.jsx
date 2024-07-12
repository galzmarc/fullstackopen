import { useState } from 'react'

const Feedback = ({ setGood, setNeutral, setBad }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button rating="good" handleClick={setGood} />
      <Button rating="neutral" handleClick={setNeutral} />
      <Button rating="bad" handleClick={setBad} />
    </div>
  );
};

const Button = ({ rating, handleClick }) => {
  return <button onClick={() => handleClick(rating)}>{rating}</button>;
};

const handleClick = (rating, setGood, setNeutral, setBad, good, neutral, bad) => {
  switch (rating) {
    case 'good':
      setGood(good + 1);
      break;
    case 'neutral':
      setNeutral(neutral + 1);
      break;
    case 'bad':
      setBad(bad + 1);
      break;
    default:
      break;
  }
};

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let goodScore = good * 1;
  let badScore = bad * -1;
  if (all === 0) {
    return(
      <div>
        <h2>statistics</h2>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(goodScore + badScore)/all} />
          <StatisticLine text="positive" value={(good/all)*100 + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedbackClick = (rating) => {
    switch (rating) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Feedback setGood={() => handleFeedbackClick('good')} setNeutral={() => handleFeedbackClick('neutral')} setBad={() => handleFeedbackClick('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App