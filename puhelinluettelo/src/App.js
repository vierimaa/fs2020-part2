import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [notificationMessage, setnotificationMessage] = useState({message: null, type: null})

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        console.log('initialPersons', initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const handleCreatePerson = (newName, newNumber) => {
    const personObject = { name: newName, number: newNumber }
    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => handleNotification(`${error.response.data.error}`, 'error'))  
  }

  const handleUpdatePerson =  (existingPerson, newNumber) => {
    const updatedPersonObject = { ...existingPerson, number: newNumber }
    personService
      .update(existingPerson.id, updatedPersonObject)
      .then(returnedUpdatedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedUpdatedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Update error', error)
        handleNotification(`${existingPerson.name} was already deleted from the server.`, 'error')
        setPersons(persons.filter(person => person.id !== existingPerson.id))
      })
  }

  const handleDeletePerson = (id, name) => {
    const result = window.confirm(`Do you really want to delete ${name}?`)
    if (result){
      console.log('handleDelete', id)
      const newPersons = persons.filter(person => person.id !== id )
      console.log('newPersons', newPersons)
      personService
      .deletePerson(id)
        .then(setPersons(newPersons))
        .catch(error => {
          console.log('Delete error', error)
          handleNotification(`${name} was already deleted from the server.`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    } else {
      console.log('Exited window confirm')
    }
  }

  const handleNotification = (message, type) => {
    setnotificationMessage({message: message, type: type})
    setTimeout(() => setnotificationMessage({message: null, type: null}), 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.filter(person => person.name === newName)[0]
    console.log('existingPerson', existingPerson)
    
    if (existingPerson !== undefined && existingPerson.name === newName && existingPerson.number === newNumber){
      handleNotification(`${newName} is already added to phonebook!`, 'error')
    } else if (existingPerson !== undefined && existingPerson.name === newName && existingPerson.number !== newNumber) {
      handleUpdatePerson(existingPerson, newNumber)
      handleNotification(`${existingPerson.name} was updated in contacts.`, 'notification')
    } else if (existingPerson === undefined && newName.length > 5 && newNumber.length > 8) {
      handleCreatePerson(newName, newNumber)
      handleNotification(`${newName} was added to contacts.`, 'notification')
    } else {
      handleCreatePerson(newName, newNumber)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h3>Add new contact</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PersonList personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App