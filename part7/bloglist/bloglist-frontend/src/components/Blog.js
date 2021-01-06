import React from "react"
import { Link } from "react-router-dom"
import {
    TableCell,
    TableRow,
} from '@material-ui/core'

const Blog = ({ blog }) => {

    return(
        <TableRow className="blog-entry">
            <TableCell>
                <Link to={`/blog/${blog.id}`}>
                    {blog.title}
                </Link>
            </TableCell>
            <TableCell>
                {blog.author}
            </TableCell>
        </TableRow>

    )
}

export default Blog
