import React from "react"
import PropTypes from "prop-types"
// import { useSelector, useDispatch } from "react-redux"
// import { remove, addLike } from "../reducers/blogReducer"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
    // const [showBlog, setShowBlog] = useState(true)

    // const dispatch = useDispatch()

    // const user = useSelector(state => state.user.currentUser)

    // let ownedByUser = false
    // if(user){
    //     ownedByUser = user.username === blog.user.username
    // }

    // const toggleShow = () => {
    //     setShowBlog(!showBlog)
    // }
    // const deleteBlog = async () => {
    //     if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)){
    //         dispatch(remove(blog.id))
    //     }
    // }

    return(
        <div className="blog-entry">
            <Link to={`/blog/${blog.id}`}>
                {blog.title} | {blog.author}
            </Link>
        </div>

    )

    // return (
    //     <div className="blog-entry">
    //         {showBlog
    //             ? <div>
    //                 {blog.title} {blog.author}{" "}
    //                 <button onClick={toggleShow} id="show-button">
    //                     view
    //                 </button>
    //             </div>
    //             : <div>
    //                 <div id="blog-title">
    //                     {blog.title}{" "}
    //                     <button onClick={toggleShow} id="hide-button">
    //                         hide
    //                     </button> <br/>
    //                 </div>

    //                 <div id="blog-url">
    //                     <a href={blog.url}>{blog.url}</a> <br/>
    //                 </div>

    //                 <div id="blog-likes">
    //                     {blog.likes}{" "}
    //                     <button onClick={() => dispatch(addLike(blog))} id="like-button">
    //                         like
    //                     </button>  <br/>
    //                 </div>

    //                 <div id="blog-author">
    //                     {blog.author} <br/>
    //                 </div>

    //                 {ownedByUser
    //                     ?<div>
    //                         <button onClick={deleteBlog} id="remove-button">
    //                             remove
    //                         </button>
    //                     </div>
    //                     : <div>{blog.user.username}</div>
    //                 }
    //             </div>
    //         }
    //     </div>
    // )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog
