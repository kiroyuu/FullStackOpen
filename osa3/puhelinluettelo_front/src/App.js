import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import numService from './services/persons'

import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('') 
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    numService
      .getAll()
        .then(initialNums => {
          setPersons(initialNums)
      })
      .catch(error => {
        console.log("Something went wrong.")
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) < 0) {
      const numObject = {
        name: newName, 
        number: newNum
      }

      numService
        .create(numObject)
          .then(returnedNum => {
            setPersons(persons.concat(returnedNum))
            setNewName('')
            setNewNum('')
            setErrorMessage(
              `${numObject.name} has been added.`
            )
            setStyle(
              "add"
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          //console.log(error.response.data)
          setStyle(
            "error"
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else if (window.confirm(`${newName} has already been added to phonebook, replace the old number with a new one?`)) {
      const numObject = {
        name: newName,
        number: newNum
      }
      const id = persons.find(person => person.name === newName).id
      numService
        .update(id, numObject)
        .then(returnedPerson => {
          setNewName('')
          setNewNum('')
          setErrorMessage(
          `${returnedPerson.name} has been updated.`)     
          setStyle("add")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        
          const updated = persons.map(person => person.id !== id ? person : returnedPerson)
          setPersons(updated)
            
        }) 
      }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      numService
        .deletePerson(person.id)
        .catch(error => {
          setErrorMessage(
            `${person.name} has already been deleted.`
          )
          setStyle(
            "error"
          )
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })
      setErrorMessage(
        `${person.name} has been deleted.`
      )
      setPersons(persons.filter(person => person.id !== id))
      setStyle(
        "add"
      )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={style}/>
      <Filter 
        value = {newFilter}
        onChange={handleNewFilter}
      />
      <h3>Add a new</h3>
      <PersonForm 
        addNumber = {addNumber}
        newName = {newName}
        nameChange = {handleNameChange}
        newNum = {newNum}
        numChange = {handleNumChange}
      />
      <h3>Numbers</h3>
        <Persons persons={persons} filter={newFilter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App