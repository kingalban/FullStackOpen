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
        <div className="blogEntry">
            {showBlog
                ? <div>
                    {blog.title} {blog.author}{" "}
                    <button onClick={toggleShow} className="showButton">
                        view
                    </button>
                </div>
                : <div>
                    {blog.title}{" "}
                    <button onClick={toggleShow} className="hideButton">
                        hide
                    </button> <br/>
                    <a href={blog.url}>{blog.url}</a> <br/>
                    {blog.likes}{" "}
                    <button onClick={addLike} className="likeButton">
                    like
                    </button>  <br/>
                    {blog.author} <br/>
                    {ownedByUser
                        ?<div>
                            <button onClick={deleteBlog} className="removeButton">
                                remove
                            </button>
                        </div>
                        : <div>owned by {blog.user.name}</div>
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
