import React, {useState} from 'react'

const Blog = ({ blog }) => {
    const [showBlog, setShowBlog] = useState(true)

    const toggleShow = () => {
        setShowBlog(!showBlog)
    }

    return ( 
        <div className="blogEntry">
            {showBlog 
            ? <div> 
                    {blog.title} {blog.author}
                <button onClick={toggleShow}>
                    view
                </button> 
            </div>
            : <div> 
                {blog.title} 
                <button onClick={toggleShow}>
                    hide
                </button> <br/>
                <a href={blog.url}>{blog.url}</a> <br/>
                {blog.likes}
                <button onClick={() => console.log("liked!")}>
                    like
                </button>  <br/>
                {blog.author}
            </div>
                
            }
        </div>
    )
}

export default Blog
