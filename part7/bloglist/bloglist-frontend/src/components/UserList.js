import React from "react"
import { useSelector } from "react-redux"
import _ from "lodash"
import { Link } from "react-router-dom"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Typography,
} from '@material-ui/core'

const UserList = () => {

    const blogs = useSelector(state => state.blogs)

    let userList = []
    blogs.forEach(blog => {
        if(_.some(userList, ["name", blog.user.name])){
            userList[_.findIndex(userList, ["name", blog.user.name])].count = userList[_.findIndex(userList, ["name", blog.user.name])].count + 1
        } else {
            userList.push({
                ...blog.user,
                count: 1
            })
        }
    })

    const displayUser = (user) => {
        return (
            <TableRow key={user.id}>
                <TableCell>
                    <Link to={`/users/${user.id}`}>
                        {user.name}
                    </Link>
                </TableCell>
                <TableCell>{user.count}</TableCell>
            </TableRow>
        )
    }

    if(_.keys(userList).length) {
        return (
            <div>
                <Typography variant="h4" >
                    Users
                </Typography>
                <TableContainer component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow>
                                <TableCell>user</TableCell>
                                <TableCell>blogs created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map(user => displayUser(user))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

    return null
}

export default UserList