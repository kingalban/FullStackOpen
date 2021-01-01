
import React from 'react'
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = (propr) => {
    const filterText = useSelector(state => state.filter)

    const anecdotes = _.chain(useSelector(state => state.anecdotes))
        .orderBy(["votes"], ["desc"])
        .filter(entry => entry.content.includes(filterText))
        .value()

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