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

const Message = ({message}) => {
  if(message === null){
    return null
  } 

  return(
    <div className={message.class}>
      {message.text}
    </div>
    )

}



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  console.log("rerended")

  useEffect(() => {    
    console.log('effect')    
    personServices.getAll()
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response
          // .concat({
          //           "name": "sneaky dude",
          //           "number": "-1",
          //           "id": 10
          //         })
          )      
      })
      .catch(error => console.log(error))  
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
              // alert(`the person '${newName}' was not found on the server`)
              setMessage({text:`Information for ${newName} was not found on the server`, class:"error"})
              setTimeout(() => setMessage(null), 2000)
              setPersons(persons.filter(p => p.name !== newName))
            }
          })

        setNewName('')
        setNewNumber('')
        console.log("Contact updated")
      }

    } else if (persons.map(person => person.number.toLowerCase()).includes(newNumber.toLowerCase())) {
      // window.alert(`${newNumber} is already in the phonebook`)    
      setMessage({text:`${newName} is already in the phonebook`, class:"error"})
      setTimeout(() => setMessage(null), 2000)
      setNewNumber('')

    } else {
      
    const nameObject = {
        name: newName,
        number: newNumber
    }

        personServices
            .create(nameObject)
            .then(response => {
                setPersons(persons.concat(response))
            
                setMessage({text:`Added ${newName}`, class:"message"})
                setTimeout(() => setMessage(null), 2000)

                setNewName('')
                setNewNumber('')
                console.log("Contact entered!")            
            })
            .catch(error => {              
                setMessage({text:`${error.response.data.error}`, class:"error"})
                setTimeout(() => setMessage(null), 2000)
                console.log(error.response.data)
            })
      



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
            setPersons(persons.filter(p => p.id !== person.id))
            })
            .catch(error => {
                // alert(`the person '${person.name}' was already deleted from server`)
                setPersons(persons.filter(p => p.id !== person.id))          
                setMessage({text:`Information for ${newName} has already been removed from the server`, class:"error"})
                setTimeout(() => setMessage(null), 2000)
            })
    }

}

const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
)

return (
    <div>
        <h2>Phonebook</h2>
        <Message message={message}/>
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