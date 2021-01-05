
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import _ from "lodash"
import { addLike } from "../reducers/blogReducer"

const BlogDetails = () => {
    const dispatch = useDispatch()

    const id = useParams().id
    const blogs = useSelector(state => state.blogs)

    const blog = _.find(blogs, ["id", id])

    if(!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div id="blog-likes">
                {blog.likes} likes {" "}
                <button onClick={() => dispatch(addLike(blog))} id="like-button">
                    like
                </button>  <br/>
            </div>
            <p>added by {blog.user.name}</p>
        </div>
    )

}

export default BlogDetails