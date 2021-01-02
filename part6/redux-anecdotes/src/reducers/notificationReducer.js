
const reducer = (state = null, action) => {  
    switch(action.type) {
        case "NOTIFY": 
            return action.data
        
        default: return state
    }
}

export const setNotificaion = (notification, seconds) => {
    return dispatch => {
        setTimeout(() => 
        dispatch({
            type: "NOTIFY",
            data: null
        }), seconds * 1000)

        dispatch({
            type: "NOTIFY",
            data: notification
        })
    }
}
  
export default reducer