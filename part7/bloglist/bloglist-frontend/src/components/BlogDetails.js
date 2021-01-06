
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory, Link } from "react-router-dom"
import _ from "lodash"
import { remove, addLike, addComment } from "../reducers/blogReducer"
import { useField } from "../hooks/useField"
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    TextField,
    Button,
    Box
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

const BlogDetails = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { clear: clearComment, ...newComment } = useField("text")

    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user.currentUser)

    const blog = _.find(blogs, ["id", id])

    if(!blogs) {
        return null
    }

    if(blogs && !blog) {
        history.push("/")
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
            <ListItem key={comment.id}>
                <ListItemText
                    primary={comment.comment}
                />
            </ListItem>
        )
    }

    const submitComment = (event) => {
        event.preventDefault()

        if(newComment.value){
            dispatch(addComment(id, newComment.value))
            clearComment()
        }

    }

    return (
        <div>
            <div>
                <Typography variant="h4">
                    {blog.title}
                </Typography>
                <Box p={2}>
                    <Typography variant="h5">
                        <a href={blog.url}>{blog.url}</a>
                    </Typography>
                </Box>

                <Box p={2} id="blog-likes">
                    <Typography variant="body1" >
                        {blog.likes} likes {" "}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => dispatch(addLike(blog))}
                            id="like-button"
                            sixe="small"
                        >
                            like
                        </Button>
                    </Typography>
                </Box>

                <Box p={1} >
                    <Typography variant="body1" >
                        added by <Link to={`/users/${blog.user.id}`} >{blog.user.name}</Link>
                    </Typography>
                </Box>
                <Box p={2} >
                    {ownedByUser
                        ? <div>
                            {/* <button onClick={deleteBlog} id="remove-button">
                                remove
                            </button> */}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={deleteBlog}
                                sixe="small"
                                startIcon={<DeleteIcon />}
                            >
                                remove
                            </Button>
                        </div>
                        : null
                    }
                </Box>
            </div>

            <div>
                <Typography variant="h6" >
                    comments
                </Typography>
                <form onSubmit={submitComment}>
                    <TextField
                        id="comment"
                        name="comment"
                        variant="outlined"
                        size="small"
                        {...newComment}
                    />
                </form>

                <div >
                    <List dense={true}>
                        {blog.comments.length
                            ? blog.comments.map(comment => displayComments(comment))
                            : <div>
                                <Typography variant="body1" >
                                    No comments yet
                                </Typography>
                            </div>}

                    </List>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails