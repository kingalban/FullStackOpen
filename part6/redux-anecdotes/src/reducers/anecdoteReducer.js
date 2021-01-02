// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch(action.type) {
        case "VOTE": 
        const id = action.data.id
        const anecdoteToVote = state
            .find(anec => anec.id === id)
        const votedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        return state.map(anec => 
            anec.id === id
            ? votedAnecdote
            : anec)

        case "NEW_ANECDOTE":
        return [ ...state, action.data]

        case "INIT_ANECDOTES":
            return action.data

        default: return state
    }
}

export const vote = (id) => {
    return {
        type: "VOTE",
        data: { id }
    }
}

export const createAnecdote = (data) => {
    return {
        type: "NEW_ANECDOTE",
        data
    }
}

export const initAnecdotes = (anecdotes) => {
    return {
        type: "INIT_ANECDOTES",
        data: anecdotes
    }
}

export default reducer