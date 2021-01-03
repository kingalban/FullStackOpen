
import React from 'react'
import _ from "lodash"
import { connect } from 'react-redux'
import { incrementVote } from "../reducers/anecdoteReducer"
import { setNotificaion } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {

    const voteHandler = anecdote => {
        props.setNotificaion(`you voted for ${anecdote.content}`, 10)
        props.incrementVote(anecdote)
    }

    return ( 
        props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
    return  {
        anecdotes: _.chain(state.anecdotes)
            .orderBy(["votes"], ["desc"])
            .filter(entry => state.filter
                ? entry.content.includes(state.filter)
                : true)
            .value()
        }
}

const mapDispatchToProps =  {
    incrementVote,
    setNotificaion
}

const ConnectedAnecdotes = connect(
        mapStateToProps,
        mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes