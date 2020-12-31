import React, { useState } from "react"
import loginService from "../services/login"

const LoginForm = ({ setUser, postMessage, setToken }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )

            setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")

        } catch (exception) {
            console.log(exception)
            postMessage("credentials not accepted", "error")
        }


    }


    return(
        <form onSubmit={handleLogin} id="login-form">
            <div>
                username <input
                    type="text"
                    value={username}
                    name="Username"
                    id="username-input"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password <input
                    type="password"
                    value={password}
                    name="Password"
                    id="password-input"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit" id="login-button">login</button>
        </form>
    )
}

export default LoginForm