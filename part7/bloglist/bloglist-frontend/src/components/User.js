import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import _ from "lodash"
import Blog from "../components/Blog"
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

const User = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)

    const userBlogs = _.filter(blogs, ["user.id", id])

    if(!userBlogs[0]){
        return null
    }

    return (
        <div>
            <Typography variant="h4" >
                {userBlogs[0].user.name}
            </Typography>
            <Typography variant="h5" >
                blogs added:
            </Typography>

            <TableContainer component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow>
                            <TableCell>blog</TableCell>
                            <TableCell>author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBlogs.map(blog => <Blog key={blog.id} blog={blog} />)}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}

export default User