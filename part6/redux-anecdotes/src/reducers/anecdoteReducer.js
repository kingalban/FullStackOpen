import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch(action.type) {
        case "MODIFY": 
            return state.map(anec => 
                anec.id === action.data.id
                ? action.data
                : anec)

        case "NEW_ANECDOTE":
            console.log("adding anecdote", action.data)
            return [ ...state, action.data]

        case "INIT_ANECDOTES":
            return action.data

        default: return state
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
        const data = await anecdoteService.createNew(content)
        dispatch({
            type: "NEW_ANECDOTE",
            data
        })
    }
}

export const incrementVote = (object) => {
    const votedAnecdote = {
        ...object,
        votes: object.votes + 1
    }
    return async dispatch => {
        const data = await anecdoteService.modify(votedAnecdote)
        dispatch({
            type: "MODIFY",
            data
        })
    }
}

export default reducer