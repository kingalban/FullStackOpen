import React, { useState, useEffect } from 'react'
import personServices from './services/phonebook'

const Filter = ({filter, handleFilter}) => {
  return(
    <div>
      Filter names: <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({onSubmit, name, nameHandler, number, numHandler}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={nameHandler}/>
      </div>
      <div>
        number: <input value={number} onChange={numHandler}/>
      </div>  
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, persons, handleDelete}) => {
  return(
    <div>
      {personsToShow.map(person => <p key={person.id}>{person.name}: {person.number} 
        <button onClick={() => handleDelete(person, persons)}> delete</button> </p>)}
    </div>
  )
}




const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  console.log("rerended")

  useEffect(() => {    
    console.log('effect')    
    personServices.getAll()
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.concat(
          {
            "name": "sneaky dude",
            "number": "-1",
            "id": 10
          }
        ))      
      })  
    }, 
  [])

  const addPerson = (event) => {
    event.preventDefault()

    if(newName === "" | newNumber === ""){
      window.alert("Please enter both a name and a number")

    } else if(persons.map(p => p.name.toLowerCase() === newName.toLowerCase()).includes(true)) {

      if(window.confirm(`${newName} is already added to phonebook, replace old number with new number?`)){
        
        const nameObject = {
          name: newName,
          number: newNumber
        }

        const id = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())[0].id
        console.log("id: ", id)

        personServices
          .update(id, nameObject)
          .then(response => setPersons(persons.map(p => p.id === response.id ? response : p)))
          .catch(error => {
            console.log(error)
            if(error.response.status === 404){
              alert(`the person '${newName}' was not found on the server`)
              setPersons(persons.filter(p => p.name !== newName))
            }
          })

        setNewName('')
        setNewNumber('')
        console.log("Contact updated")
      }

    } else if (persons.map(person => person.number.toLowerCase()).includes(newNumber.toLowerCase())) {
      window.alert(`${newNumber} is already in the phonebook`)
      setNewNumber('')

    } else {
      
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personServices
        .create(nameObject)
        .then(response => setPersons(persons.concat(response)))
      
      setNewName('')
      setNewNumber('')
      console.log("Contact entered!")
    }
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    console.log("name exists? ", persons.map(p => p.name === event.target.value).includes(true))
    setNewName(event.target.value)  
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)  
    setNewNumber(event.target.value)
  }

  const deletePerson = (person, persons) => {
    if(window.confirm(`Delete ${person.name}`)){

      console.log("delete em!", person)
      
      personServices
        .deleteItem(person.id)
        .then(response => {
          console.log("then enacted...", response)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          alert(`the person '${person.name}' was already deleted from server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }

  }

  const personsToShow = persons.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} 
              handleFilter={handleFilter}/>
      <div>
      </div>
      <h3>Add new</h3>
      <PersonForm onSubmit={addPerson} 
                  name={newName} 
                  nameHandler={handleNewName} 
                  number={newNumber} 
                  numHandler={handleNewNumber}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} persons={persons} handleDelete={deletePerson}/>
    </div>
  )
}

export default App 