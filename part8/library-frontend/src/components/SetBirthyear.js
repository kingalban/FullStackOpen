import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHYEAR, ALL_BOOKS, ALL_AUTHORS } from "../queries/queries"

const SetBirthyear = (props) => {
    const [author, setAuhtor] = useState('')
    const [birthYear, setbirthYear] = useState('')

    const [ createPerson ] = useMutation(SET_BIRTHYEAR)
    
    const submit = async (event) => {
        event.preventDefault()
        
        if(!author || !birthYear) {
            return null
        }

        console.log('add book...')

        createPerson({ variables: { name:author, setBornTo: Number(birthYear) },    
            refetchQueries: [ { query: ALL_AUTHORS } ],
            onError: (error) => {      
                console.log(error.graphQLErrors[0].message)    
            }
        })   

        setAuhtor('')
        setbirthYear('')
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h3>Set birthYear</h3>
            <form onSubmit={submit}>
                <div>
                author
                <input
                    value={author}
                    onChange={({ target }) => setAuhtor(target.value)}
                />
                </div>
                <div>
                born
                <input
                    value={birthYear}
                    onChange={({ target }) => setbirthYear(target.value)}
                />
                </div>
                <button type='submit'>update year</button>
            </form>
        </div>
    )
}

export default SetBirthyear