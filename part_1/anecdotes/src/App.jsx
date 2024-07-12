import { useState } from 'react'

const Button = ({anecdotes, setSelected}) => {
  return (
    <button onClick={() => handleClick(anecdotes.length, setSelected)}>next anecdote</button>
  );
};

const handleClick = (max, setSelected) => {
  let randInt = Math.floor(Math.random() * max);
  setSelected(randInt)
};

const VoteButton = ({selected, points, setPoints}) => {
  return (
    <button onClick={() => handleVote(selected, points, setPoints)}>vote</button>
  )
}

const handleVote = (selected, points, setPoints) => {
  const newPoints = [...points]
  newPoints[selected] += 1
  setPoints(newPoints)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const initialPoints = new Array(anecdotes.length).fill(0);
  const [points, setPoints] = useState(initialPoints);

  const maxVotes = Math.max(...points)
  const bestAnecdoteIndex = points.indexOf(maxVotes);
  const bestAnecdote = anecdotes[bestAnecdoteIndex];
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <VoteButton selected={selected} points={points} setPoints={setPoints}/>
      <Button anecdotes={anecdotes} setSelected={setSelected}/>
      <h2>Anecdote with most votes</h2>
      <p>{bestAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App