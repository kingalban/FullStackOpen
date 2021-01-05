import blogService from "../services/blogs"
import _ from "lodash"



const reducer = (state = [], action) => {
    switch(action.type) {
    case "INIT_BLOGS":
        return action.data

    case "CREATE":
        return state.concat(action.data)

    case "MODIFY":
        return _.orderBy(state.map(b => b.id === action.data.id
            ? action.data
            : b),
        ["likes"], ["desc"])

    case "REMOVE":
        return state.filter(b => b.id !== action.data)

    case "ADD_COMMENT":
        return state.map(blog => blog.id === action.data.id
            ? {
                ...blog,
                comments: blog.comments.concat(action.data.comment)
            }
            : blog)

    default: return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const retrievedBlogs = await blogService
            .getAll()

        dispatch({
            type:"INIT_BLOGS",
            data:_.orderBy(retrievedBlogs, ["likes"], ["desc"])
        })

    }
}

export const create = blogObject => {
    return async (dispatch, getState) => {
        const data = await blogService.create(blogObject)

        data.user = {
            username: getState().user.currentUser.username,
            name: getState().user.currentUser.name,
            id: data.user
        }

        dispatch({
            type: "CREATE",
            data
        })
    }
}

export const addLike = blogObject => {
    return async dispatch => {
        const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
        const response = await blogService.update(blogObject.id, updatedBlog)

        if(response) {
            dispatch({
                type: "MODIFY",
                data: updatedBlog
            })
        }
    }
}

export const remove = id => {
    return async dispatch => {
        const response = await blogService.remove(id)

        if(response){
            dispatch({
                type: "REMOVE",
                data: id
            })
        }
    }
}


export const addComment = (id, comment) => {
    return async dispatch => {
        const response = await blogService.postComment(id, comment)

        if(response) {
            dispatch({
                type: "ADD_COMMENT",
                data: {
                    comment: response,
                    id
                }
            })
        }
    }
}


export default reducer