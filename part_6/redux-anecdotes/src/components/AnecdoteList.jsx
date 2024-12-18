import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.filter === ''
    ? state.anecdotes
    : state.anecdotes.filter(a => a.content.includes(state.filter))
  )

  const vote = (id) => {
    dispatch(handleVote(id))
  }

  // Anecdotes are ordered by the number of votes
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList