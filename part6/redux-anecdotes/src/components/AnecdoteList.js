
import React from 'react'
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from "../reducers/anecdoteReducer"

const AnecdoteList = (propr) => {
    console.log("anecdotes:", useSelector(state => state.anecdotes).length)
    const dispatch = useDispatch()

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

    const voteHandler = anecdote => {
        dispatch(incrementVote(anecdote))
    }

    return ( 
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
            </div>
        )
    )
}

export default AnecdoteList