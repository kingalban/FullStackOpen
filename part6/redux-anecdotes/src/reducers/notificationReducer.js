const emptyState = {
    text: null,
    timeiD: null
}

const reducer = (state = emptyState, action) => {  
    switch(action.type) {
        case "NOTIFY": 
            clearTimeout(state.timeID)
            return action.data
        
        default: return state
    }
}

export const setNotificaion = (text, seconds) => {
    return dispatch => {
        const timeID = setTimeout(() => 
            dispatch({
                type: "NOTIFY",
                data: {
                    text: null,
                    timeID: null
                }
            }), 
            seconds * 1000
        )

        dispatch({
            type: "NOTIFY",
            data: {
                text,
                timeID
            }
        })
    }
}
  
export default reducer