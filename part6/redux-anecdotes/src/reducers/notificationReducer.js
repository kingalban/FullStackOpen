
const reducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type) {
        case "NOTIFY": 
            return action.data

        case "UN_NOTIFY":
            return null
        
        default: return state
    }
}

export const setNotificaion = (notification) => {
    console.log("NOTIFYING")
    return {
        type: "NOTIFY",
        data: notification
    }
}

export const removeNotificaion = () => {
    console.log("REMOVING NOTIFICATION")
    return {
        type: "UN_NOTIFY",
        data: null
    }
}
  
export default reducer