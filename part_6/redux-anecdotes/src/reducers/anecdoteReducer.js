import { createSlice } from '@reduxjs/toolkit'
import { setTimedNotification } from './notificationReducer'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    newAnecdote: (state, action) => {
      state.push(action.payload)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const handleVote = (id) => {
  return (dispatch, getState) => {
    dispatch(voteAnecdote(id))

    const anecdote = getState().anecdotes.find(a => a.id === id)
    dispatch(setTimedNotification(`You voted for "${anecdote.content}"`, 5))
  }
}

export const { voteAnecdote, newAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createOne(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer