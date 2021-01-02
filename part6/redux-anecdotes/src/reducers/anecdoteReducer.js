import anecdoteService from "../services/anecdotes"

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

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: "INIT_ANECDOTES",
            data: anecdotes
        })
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdoteObject = await anecdoteService.createNew(content)
        dispatch({
            type: "NEW_ANECDOTE",
            anecdoteObject
        })
    }
}

export default reducer