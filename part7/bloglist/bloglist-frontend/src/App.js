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
import Container from "@material-ui/core/Container"

import { useDispatch, useSelector } from "react-redux"
import { login } from "./reducers/userReducer"
import { initBlogs } from "./reducers/blogReducer"

import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from "react-router-dom"

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
} from "@material-ui/core"

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
        <Container>
            <Router>
                <h2>blogs</h2>

                <Notification />
                <Navigation />
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
                    <Route path="/login" render={() =>
                        user ? <Redirect to="/" /> : <LoginForm />}>
                    </Route>
                    <Route path="/">
                        {user === null
                            ? null
                            : <Togglable buttonLabel="new entry" ref={blogFormRef}>
                                <BlogForm blogFormRef={blogFormRef} />
                            </Togglable>
                        }

                        <TableContainer component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>blog</TableCell>
                                        <TableCell>author</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {blogs.map(blog =>
                                        <Blog
                                            key={blog.id}
                                            blog={blog}
                                        />
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Route>
                </Switch>
            </Router>
        </Container>
    )

}

export default App