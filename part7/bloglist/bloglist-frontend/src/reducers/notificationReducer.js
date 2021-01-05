const nullNotification = {
    text: "",
    type: null,
    timeID: null
}

const reducer = (state = nullNotification, action) => {

    switch(action.type) {
    case "NOTIFY":
        clearTimeout(state.timeID)
        return action.data

    case "CLEAR":
        clearTimeout(state.timeID)
        return nullNotification

    default: return state
    }
}

export const postNotification = (text, type = "message", time = 5) => {
    return async dispatch => {
        const timeID = setTimeout(() => {
            dispatch({ type: "CLEAR" })
        }, time * 1000)

        dispatch({
            type: "NOTIFY",
            data: {
                text,
                type,
                timeID
            }
        })
    }
}

export const clearNotification = () => {
    return async dispatch => {
        dispatch({ type: "CLEAR" })
    }
}

export default reducer