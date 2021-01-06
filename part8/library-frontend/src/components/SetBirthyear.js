import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SET_BIRTHYEAR, ALL_AUTHORS } from "../queries/queries"

const SetBirthyear = (props) => {
    const [author, setAuhtor] = useState("")
    const [birthYear, setbirthYear] = useState("")

    const [ authors, setAuthors ] = useState(null)
    const [ createPerson ] = useMutation(SET_BIRTHYEAR)

    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if(result.data) {
            setAuthors(result.data.allAuthors)
        }
    }, [result])    

    
    const submit = async (event) => {
        event.preventDefault()
        
        if(!author || !birthYear) {
            return null
        }

        createPerson({ variables: { name:author, setBornTo: Number(birthYear) },    
            refetchQueries: [ { query: ALL_AUTHORS } ],
            onError: (error) => {      
                console.log(error.graphQLErrors[0].message)    
            }
        })   

        setAuhtor('')
        setbirthYear('')
    }

    const authorEntry = (author) => {
        return (
            <option value={author.name}>{author.name}</option>
        )
    }

    const onChange = (event) => {
        setAuhtor(event.target.value)
    }

    if (!props.show || !authors) {
        return null
    }

    return (
        <div>
            <h3>Set birthYear</h3>
            <form onSubmit={submit}>
                <select value={author} onChange={onChange}>
                    <option value="select author">select author...</option>
                    {authors.map(authorEntry)}
                </select>
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