import { useEffect, useState } from 'react'

import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Notification from './components/Notification';

import contactService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, []); 

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(p => p.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      contactService
        .createContact(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added contact: '${newName}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    let person = persons.find(p => p.id === id)
    if (window.confirm(`"Delete ${person.name}?`)) {
      contactService
      .deleteContact(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== res.id))
      })
    }
  }

  const filterPersons = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} filterFunc={filterPersons}/>
      <h2>add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <ContactList personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;