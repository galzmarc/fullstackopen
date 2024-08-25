import axios from 'axios'

const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createContact = newObject => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const deleteContact = id => {
  const req = axios.delete(baseUrl.concat('', `/${id}`))
  return req.then(res => res.data)
}

export default {getAll, createContact, deleteContact}