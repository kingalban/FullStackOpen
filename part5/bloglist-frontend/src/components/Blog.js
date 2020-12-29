import React, {useState} from 'react'
import _ from 'lodash'

const Blog = ({ blog, updateBlog, blogs, setBlogs }) => {
    const [showBlog, setShowBlog] = useState(true)

    const toggleShow = () => {
        setShowBlog(!showBlog)
    }

    const addLike = async () => {
        const updatedBlog = {...blog, likes: blog.likes+1}
        const response = await updateBlog(blog.id, updatedBlog)

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

    return ( 
        <div className="blogEntry">
            {showBlog 
            ? <div> 
                    {blog.title} {blog.author}{" "}
                <button onClick={toggleShow}>
                    view
                </button> 
            </div>
            : <div> 
                {blog.title}{" "}
                <button onClick={toggleShow}>
                    hide
                </button> <br/>
                <a href={blog.url}>{blog.url}</a> <br/>
                {blog.likes}{" "}
                <button onClick={addLike}>
                    like
                </button>  <br/>
                {blog.author}
            </div>
                
            }
        </div>
    )
}

export default Blog
