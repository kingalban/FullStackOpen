import React, { useState } from "react"
import PropTypes from "prop-types"
import _ from "lodash"

const Blog = ({ blog, blogService, blogs, setBlogs, user }) => {
    const [showBlog, setShowBlog] = useState(true)

    let ownedByUser = false
    if(user){
        ownedByUser = user.username === blog.user.username
    }

    const toggleShow = () => {
        setShowBlog(!showBlog)
    }

    const addLike = async () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        const response = await blogService.update(blog.id, updatedBlog)

        console.log("blog:", updatedBlog.title, "likes:", updatedBlog.likes)

        if(response) {
            setBlogs(
                _.orderBy(blogs.map(b => {
                    if(blog.id === b.id){
                        return updatedBlog
                    } else {
                        return b
                    }
                })
                , ["likes"], ["desc"])
            )
        }
    }

    const deleteBlog = async () => {
        if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)){

            const response = await blogService.remove(blog.id)

            if(response){
                setBlogs(
                    blogs.filter(b => b.id !== blog.id)
                )
            }
        }
    }

    return (
        <div className="blog-entry">
            {showBlog
                ? <div>
                    {blog.title} {blog.author}{" "}
                    <button onClick={toggleShow} id="show-button">
                        view
                    </button>
                </div>
                : <div>
                    <div id="blog-title">
                        {blog.title}{" "}
                        <button onClick={toggleShow} id="hide-button">
                            hide
                        </button> <br/>
                    </div>

                    <div id="blog-url">
                        <a href={blog.url}>{blog.url}</a> <br/>
                    </div>

                    <div id="blog-likes">
                        {blog.likes}{" "}
                        <button onClick={addLike} id="like-button">
                            like
                        </button>  <br/>
                    </div>

                    <div id="blog-author">
                        {blog.author} <br/>
                    </div>

                    {ownedByUser
                        ?<div>
                            <button onClick={deleteBlog} id="remove-button">
                                remove
                            </button>
                        </div>
                        : null
                    }
                </div>
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogService: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog
