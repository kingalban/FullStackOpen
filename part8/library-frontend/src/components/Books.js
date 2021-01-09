import React, { useState, useEffect } from 'react'
import _ from "lodash"
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries/queries"


const Books = (props) => {

    const [ books, setBooks ] = useState(null)
    const [ genreFilter, setGenreFilter ] = useState(null)

    const result = useQuery(ALL_BOOKS)

    useEffect(() => {
        if(result.data) {
            setBooks(result.data.allBooks)
        }
    }, [result])    
    
    if (!props.show || !books) {
        return null
    }

    const booksToDisplay = books.filter(b => genreFilter
        ? b.genres.includes(genreFilter)
        : true)

    const genreList = _.chain(books)
                    .map(b => b.genres)
                    .flatten()
                    .uniq()
                    .value()

    
    const genreButton = (genre) => {
        return (
            <td key={genre}>
                <button onClick={() => setGenreFilter(genre)}>
                    {genre}
                </button>
            </td>
        )
    }

    return (
        <div>
            <h2>books</h2>

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
                {booksToDisplay.map(b =>
                    <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div>
                <table>
                    <tbody>
                        <tr key="genreButtons">
                            <td key="reset">
                                <button onClick={() => setGenreFilter(null)}>
                                    <em>reset</em>
                                </button>
                            </td>
                            {genreList.map(genreButton)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Books