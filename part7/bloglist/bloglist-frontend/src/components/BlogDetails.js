
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import _ from "lodash"
import { remove, addLike, addComment } from "../reducers/blogReducer"
import { useField } from "../hooks/useField"

const BlogDetails = () => {

    console.log("details rerendered")
    const dispatch = useDispatch()
    const history = useHistory()

    const { clear: clearComment, ...newComment } = useField("text")

    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user.currentUser)

    const blog = _.find(blogs, ["id", id])

    if(!blog) {
        return null
    }

    let ownedByUser = false
    if(user){
        ownedByUser = user.username === blog.user.username
    }

    const deleteBlog = async () => {
        if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)){
            dispatch(remove(blog.id))
            history.push("/")
        }
    }

    const displayComments = (comment) => {
        return (
            <li key={comment.id}>{comment.comment}</li>
        )
    }

    const submitComment = (event) => {
        event.preventDefault()

        if(newComment.value){
            console.log(newComment.value)
            dispatch(addComment(id, newComment.value))
            clearComment()
        }

    }

    return (
        <div>
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
                {ownedByUser
                    ? <div>
                        <button onClick={deleteBlog} id="remove-button">
                            remove
                        </button>
                    </div>
                    : <p>added by {blog.user.name}</p>
                }
            </div>
            <div>
                <h3>comments</h3>
                <form onSubmit={submitComment}>
                    <input id="comment" {...newComment}/>
                </form>
                <ul>
                    {blog.comments.length
                        ? blog.comments.map(comment => displayComments(comment))
                        : <div>No comments yet</div>}
                </ul>
            </div>
        </div>
    )

}

export default BlogDetails