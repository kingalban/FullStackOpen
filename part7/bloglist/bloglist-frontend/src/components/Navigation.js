import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"

const Navigation = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser)

    const style = {
        padding: 5,
        display: "inline-block"
    }

    return (
        <div style={{backgroundColor: "slateGray"}}>
            <Link style={style} to="/">blogs</Link>
            <Link style={style} to="/users">users</Link>
            {user
                ? <div style={style}>{user.name} logged in
                    <button onClick={() => dispatch(logout())} id="logout-button">
                        logout
                    </button>
                </div>
                :null
            }
        </div>
    )
}

export default Navigation