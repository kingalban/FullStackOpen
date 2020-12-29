import React, { useState } from 'react'

const BlogForm = ({ blogs, setBlogs, createBlog, postMessage, blogFormRef }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogURL, setNewBlogURL] = useState('')

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
            setBlogs(blogs.concat(returnedBlog))
            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogURL('')
        }
    }

    return(
        <form onSubmit={addBlog}>
        <div>
            title: <input
                        value={newBlogTitle}
                        onChange={handleTitleChange}
                        />
        </div>
        <div>
            author: <input
                        value={newBlogAuthor}
                        onChange={handleAuthorChange}
                    />
        </div>
        <div>
            url:    <input
                        value={newBlogURL}
                        onChange={handleURLChange}
                        />
        </div>
        <button type="submit">save</button>
        </form>  
    )
}


export default BlogForm