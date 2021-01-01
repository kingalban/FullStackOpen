
const reducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type) {
        case "FILTER": 
            return action.data
        
        default: return state
    }
}

export const filter = (filter) => {
    return {
        type: "FILTER",
        data: filter
    }
}
  
export default reducer