
const initialNotification = "this is stored in REDUX"

const reducer = (state = initialNotification, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type) {
      case "NOTIFY": 
        return action.data
      default: return state
    }
}

export const vote = (notification) => {
    return {
        type: "NOTIFY",
        data: {notification}
    }
}
  
export default reducer