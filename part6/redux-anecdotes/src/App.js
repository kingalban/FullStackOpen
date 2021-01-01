import React from 'react'
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote} from "./reducers/anecdoteReducer"

const App = () => {
  const anecdotes = _.orderBy(useSelector(state => state), ["votes"], ["desc"])
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App