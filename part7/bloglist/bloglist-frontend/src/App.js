import React, { useEffect } from "react"
import "./App.css"
import Blog from "./components/Blog"
import Notification from "./components/notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import UserList from "./components/UserList"
import User from "./components/User"
import BlogDetails from "./components/BlogDetails"
import Navigation from "./components/Navigation"

import { useDispatch, useSelector } from "react-redux"
import { login } from "./reducers/userReducer"
import { initBlogs } from "./reducers/blogReducer"

import {
    BrowserRouter as Router,
    Switch, Route,// Link
} from "react-router-dom"

const App = () => {

    const user = useSelector(state => state.user.currentUser)
    const blogs = useSelector(state => state.blogs)

    const blogFormRef = React.createRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(login())
    }, [dispatch])

    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    return (
        <Router>
            <h2>blogs</h2>

            <Notification />
            <Navigation />
            <LoginForm />
            <hr/>
            <Switch>
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/blog/:id">
                    <BlogDetails />
                </Route>
                <Route path="/">
                    {user === null
                        ? null
                        : <Togglable buttonLabel="new entry" ref={blogFormRef}>
                            <BlogForm blogFormRef={blogFormRef} />
                        </Togglable>
                    }

                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                        />
                    )}
                </Route>
            </Switch>
        </Router>
    )

}

export default App