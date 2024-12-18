import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests';

import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    // Dispatch the notification message
    dispatch({ type: 'SET', payload: `anecdote "${anecdote.content}" voted` })
    // Clear the notification after a 5 seconds delay
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App