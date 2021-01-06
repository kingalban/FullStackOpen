  
import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const Authors = (props) => {
    
    const ALL_AUTHORS = gql`
    query {
        allAuthors  {
            name
            born
            bookCount
        }
    }
    `
    const [ authors, setAuthors ] = useState(null)

    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if(result.data) {
            setAuthors(result.data.allAuthors)
        }
    }, [result])    
    
    if (!props.show) {
        return null
    }
    
    if(authors) {
        return (
            <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    born
                    </th>
                    <th>
                    books
                    </th>
                </tr>
                {authors.map(a =>
                    <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            </div>
        )
    }
    
    return null
}

export default Authors
