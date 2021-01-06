import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { create } from "../reducers/blogReducer"
import { postNotification } from "../reducers/notificationReducer"
import { useField } from "../hooks/useField"
import { TextField, Button, Box } from "@material-ui/core"

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
        dispatch(postNotification(`Added new blog: ${newBlogTitle.value} by ${newBlogAuthor.value}`))

        clearTitle()
        clearAuthor()
        clearURL()
    }

    return(
        <form onSubmit={addBlog}>
            <div>
                <TextField 
                    id="title"
                    label="title"
                    {...newBlogTitle}
                />
            </div>
            <div>
                <TextField 
                    id="author"
                    label="author"
                    {...newBlogAuthor}
                />
            </div>
            <div>
                <TextField 
                    id="url"
                    label="url"
                    {...newBlogURL}
                />
            </div>
            <Box p={1}>
                <Button variant="contained" color="primary" type="submit" size="small">
                    save
                </Button>
            </Box>
        </form>
    )
}


BlogForm.propTypes = {
    blogFormRef: PropTypes.object.isRequired,
}



export default BlogForm