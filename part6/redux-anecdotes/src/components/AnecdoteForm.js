import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote} from "../reducers/anecdoteReducer"
import { setNotificaion } from "../reducers/notificationReducer"

const NewAnecdote = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ""

        props.setNotificaion(anecdote, 2)
        
        props.createAnecdote(anecdote)
    }


    return (  
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} >
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}


const ConnectedNewAnecdote = connect(
    null,
    {
        createAnecdote,
        setNotificaion
    }
)(NewAnecdote)

export default ConnectedNewAnecdote