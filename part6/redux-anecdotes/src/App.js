import React, { useEffect }from 'react'
import NewAnecdote from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { initAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import anecdoteService from "./services/anecdotes"

const App = () => {    
    const dispatch = useDispatch()
    console.log("app rendered")
    
    useEffect(() => {
        anecdoteService
            .getAll()
            .then(anecdotes => dispatch(initAnecdotes(anecdotes)))
    }, [dispatch])
    
    return (
        <div>
        <h2>Anecdotes</h2>
        <Notification />
        <Filter />
        <AnecdoteList />
        <NewAnecdote />
        </div>
    )
}

export default App