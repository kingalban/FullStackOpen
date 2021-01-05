import React from "react"
import { useSelector } from "react-redux"
import _ from "lodash"
import { Link } from "react-router-dom"

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
            <tr key={user.id}>
                <th>
                    <Link to={`${user.id}`}>
                        {user.name}
                    </Link>
                </th>
                <th></th>
                <th>{user.count}</th>
            </tr>
        )
    }

    if(_.keys(userList).length) {
        return (
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th><h3>User</h3></th>
                            <th>|</th>
                            <th><h3>Blogs created</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => displayUser(user))}
                    </tbody>
                </table>
            </div>
        )
    }

    return null
}

export default UserList