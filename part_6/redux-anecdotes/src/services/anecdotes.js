import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createOne = async (newAnecdoteObj) => {
  const response = await axios.post(baseUrl, newAnecdoteObj)
  return response.data
}

export default { getAll, createOne }