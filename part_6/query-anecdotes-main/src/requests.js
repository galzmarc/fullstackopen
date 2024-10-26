import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = async (newAnecdote) => {
  try {
    const res = await axios.post(baseUrl, newAnecdote);
    return res.data;  // Return data if successful
  } catch (err) {
    console.log('Error creating anecdote:', err.response.data.error);
    throw new Error(err.response.data.error);  // Throw error to be caught by useMutation
  }
}

export const updateAnecdote = updatedAnecdote => {
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => res.data)
}