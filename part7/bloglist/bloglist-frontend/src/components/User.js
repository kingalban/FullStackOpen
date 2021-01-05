import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import _ from "lodash"

const User = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)

    const userBlogs = _.filter(blogs, ["user.id", id])

    const displayBlog = (blog) => {
        return (
            <li key={blog.id}>{blog.title}</li>
        )
    }

    if(!userBlogs[0]){
        return null
    }

    return (
        <div>
            <h2>{userBlogs[0].user.name}</h2>
            <h3>Added blogs:</h3>
            <ul>
                {userBlogs.map(blog => displayBlog(blog))}
            </ul>
        </div>
    )

}

export default User