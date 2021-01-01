import React from 'react'
import NewAnecdote from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"

const App = () => {    
    return (
        <div>
        <h2>Anecdotes</h2>
        <NewAnecdote />
        <AnecdoteList />
        <Notification />
        </div>
    )
}

export default App