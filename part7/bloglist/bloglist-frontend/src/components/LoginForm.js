import React from "react"
import loginService from "../services/login"
import { login, logout } from "../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { useField } from "../hooks/useField"
import { postNotification } from "../reducers/notificationReducer"


const LoginForm = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser)

    const { clear: clearUsername, ...username } = useField("text")
    const { clear: clearPassword, ...password } = useField("password")

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })

            clearUsername()
            clearPassword()

            dispatch(login(user))

        } catch (exception) {
            console.log(exception)
            dispatch(postNotification("credentials not accepted", "error"))
        }


    }

    if(!user) {
        return (
            <form onSubmit={handleLogin} id="login-form">
                <div>
                    username <input
                        {...username}
                        name="Username"
                        id="username-input"
                    />
                </div>
                <div>
                    password <input
                        {...password}
                        name="Password"
                        id="password-input"
                    />
                </div>
                <button type="submit" id="login-button">login</button>
            </form>
        )
    }

    return (
        <div>
            {user.name} logged in <button onClick={() => dispatch(logout())} id="logout-button">logout</button>
        </div>
    )
}

export default LoginForm