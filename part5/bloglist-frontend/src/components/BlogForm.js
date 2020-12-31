import React, { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ blogs, setBlogs, createBlog, postMessage, blogFormRef, user }) => {

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")

    const handleTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleURLChange = (event) => {
        setNewBlogURL(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()

        if(!newBlogTitle || !newBlogAuthor || !newBlogURL){
            return(null)
        }

        const blogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL
        }

        console.log("adding:", blogObject)

        const returnedBlog = await createBlog(blogObject)

        if(returnedBlog){
            blogFormRef.current.toggleVisibility()
            postMessage(`Added new blog: ${newBlogTitle} by ${newBlogAuthor}`, "message")

            setBlogs(blogs
                .concat({
                    ...returnedBlog,
                    user: {
                        name: user.name,
                        username: user.username
                    }
                })
            )

            setNewBlogTitle("")
            setNewBlogAuthor("")
            setNewBlogURL("")
        }
    }

    return(
        <form onSubmit={addBlog}>
            <div>
            title: <input
                    id='title'
                    value={newBlogTitle}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
            author: <input
                    id='author'
                    value={newBlogAuthor}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
            url:<input
                    id='url'
                    value={newBlogURL}
                    onChange={handleURLChange}
                />
            </div>
            <button type="submit" id="submitButton">save</button>
        </form>
    )
}


BlogForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    createBlog: PropTypes.func.isRequired,
    postMessage: PropTypes.func.isRequired,
    blogFormRef: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}



export default BlogForm