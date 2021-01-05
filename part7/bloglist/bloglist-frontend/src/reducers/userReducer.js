import blogService from "../services/blogs"
import userService from "../services/users"

const emptyUsers = {
    currentUser: null,
    userList: []
}

const reducer = (state = emptyUsers, action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch(action.type) {
    case "LOGIN":{
        return {
            ...state,
            currentUser: action.data
        }
    }

    case "LOGOUT":{
        return {
            ...state,
            currentUser: null
        }
    }

    default: return state
    }
}

export const login = (user) => {
    return async dispatch => {
        if(user) {
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch({
                type: "LOGIN",
                data: user
            })
        } else {
            const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                blogService.setToken(user.token)
                dispatch({
                    type: "LOGIN",
                    data: user
                })
            }
        }
    }
}

export const oldLogin = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: "LOGIN",
                data: user
            })
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch({
            type: "LOGOUT"
        })
    }
}

export const initUsers = () => {
    return async dispatch => {
        const data = userService.getAll()
        dispatch({
            type: "INIT_USER_LIST",
            data
        })
    }
}

// export const updateUsers = () => {
//     return async dispatch => {
//         const data = userService.getAll()
//         dispatch({
//             type: "MODIFY_USER_LIST",
//             data
//         })
//     }
// }

export default reducer