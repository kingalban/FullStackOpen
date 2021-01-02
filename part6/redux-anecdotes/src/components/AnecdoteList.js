
import React from 'react'
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = (propr) => {

    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(anecdotes.length){
            return _.chain(anecdotes)
                .orderBy(["votes"], ["desc"])
                .filter(entry => filter
                    ?entry.content.includes(filter)
                    :entry)
                .value()
        }
        return anecdotes
    })

    const dispatch = useDispatch()

    return ( 
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
            </div>
        )
    )
}

export default AnecdoteList