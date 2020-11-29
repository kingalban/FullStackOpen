import React, { useState } from 'react'


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

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person => <p key={person.number}>{person.name}: {person.number}</p>)}
    </div>
  )

}




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(newName === "" | newNumber === ""){
      window.alert("Please enter both a name and a number")

    } else if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')

    } else if (persons.map(person => person.number.toLowerCase()).includes(newNumber.toLowerCase())) {
      window.alert(`${newNumber} is already added to phonebook`)
      setNewNumber('')

    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
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
    setNewName(event.target.value)  
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)  
    setNewNumber(event.target.value)
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App 