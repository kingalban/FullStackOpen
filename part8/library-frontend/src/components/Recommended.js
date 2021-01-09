import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from "../queries/queries"


const Recommended = (props) => {

    const [ books, setBooks ] = useState(null)
    const [ favoriteGenre, setFavoriteGenre ] = useState(null)
    const token = localStorage.getItem("phonenumbers-user-token")

    const {loading, data: userResult, refetch } = useQuery(ME, { 
        fetchPolicy: "no-cache",
    })

    const skipBooks = favoriteGenre === null
    const bookResult = useQuery(ALL_BOOKS, { 
        variables: { genre: favoriteGenre },
        skip: skipBooks
    })

    useEffect(() => {
        if(bookResult.data) {
            setBooks(bookResult.data.allBooks)
        }
    }, [bookResult]) 

    useEffect(() => {
        if(!loading && userResult.me) {
            setFavoriteGenre(userResult.me.favoriteGenre)
        }
    }, [loading, userResult])    

    useEffect(() => refetch, [token, refetch])
    
    if (!props.show || books === null ) {
        return null
    }

    if(books.length === 0) {
        return (
            <div>
                <h2>Recommended books</h2>
                <em>no books found in your favourite genre</em>
            </div>
        )
    }

    return (
        <div>
            <h2>Recommended books</h2>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {books.map(b =>
                    <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended