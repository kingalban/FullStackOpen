import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { create } from "../reducers/blogReducer"
import { postNotification } from "../reducers/notificationReducer"
import { useField } from "../hooks/useField"

const BlogForm = ({ blogFormRef }) => {

    const { clear: clearTitle, ...newBlogTitle } = useField("text")
    const { clear: clearAuthor, ...newBlogAuthor } = useField("text")
    const { clear: clearURL, ...newBlogURL } = useField("text")

    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()

        if(!newBlogTitle.value || !newBlogAuthor.value || !newBlogURL.value){
            return(null)
        }

        const blogObject = {
            title: newBlogTitle.value,
            author: newBlogAuthor.value,
            url: newBlogURL.value
        }

        console.log("adding:", blogObject)

        dispatch(create(blogObject))

        blogFormRef.current.toggleVisibility()
        dispatch(postNotification(`Added new blog: ${newBlogTitle} by ${newBlogAuthor}`))

        clearTitle()
        clearAuthor()
        clearURL()
    }

    return(
        <form onSubmit={addBlog}>
            <div>
            title: <input
                    id='title'
                    {...newBlogTitle}
                />
            </div>
            <div>
            author: <input
                    id='author'
                    {...newBlogAuthor}
                />
            </div>
            <div>
            url:<input
                    id='url'
                    {...newBlogURL}
                />
            </div>
            <button type="submit" id="submit-button">save</button>
        </form>
    )
}


BlogForm.propTypes = {
    blogFormRef: PropTypes.object.isRequired,
}



export default BlogForm