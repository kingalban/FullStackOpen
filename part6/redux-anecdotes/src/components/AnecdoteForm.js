import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote} from "../reducers/anecdoteReducer"
import { setNotificaion, removeNotificaion } from "../reducers/notificationReducer"

const NewAnecdote = (props) => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ""

        dispatch(setNotificaion(anecdote))
        setTimeout(() => dispatch(removeNotificaion()), 2000)
        
        dispatch(createAnecdote(anecdote))
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

export default NewAnecdote