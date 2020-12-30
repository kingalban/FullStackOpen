import React, { useState, useEffect } from "react"
import _ from "lodash"
import "./App.css"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const blogFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        (async () => {
            // blogService
            //     .getAll()
            //     .then(blogs =>
            //         setBlogs( blogs )
            //     )
            const retrievedblogs = await blogService
                .getAll()
            setBlogs(_.orderBy(retrievedblogs, ["likes"], ["desc"]))
        })()
    }, [])

    const logout = () => {
        console.log("logging out...")
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
    }

    const postMessage = ( message, messageType ) => {
        setMessage(message)
        setMessageType(messageType)

        setTimeout(() => {
            setMessage(null)
            setMessageType(null)
        }, 3000)

    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification message={message} messageType={messageType}/>

            {user === null
                ?<Togglable buttonLabel="login">
                    <LoginForm
                        setUser={setUser}
                        postMessage={postMessage}
                        setToken={blogService.setToken}/>
                </Togglable>
                :<div>
                    <p>
                        {user.name} logged in <button onClick={logout}>logout</button>
                    </p>
                    <Togglable buttonLabel="new entry" ref={blogFormRef}>
                        <BlogForm
                            blogs={blogs}
                            setBlogs={setBlogs}
                            createBlog={blogService.create}
                            postMessage={postMessage}
                            blogFormRef={blogFormRef}
                            user={user}
                        />
                    </Togglable>
                </div>
            }
            <hr/>

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    blogService={blogService}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}/>
            )}
        </div>
    )

}

export default App