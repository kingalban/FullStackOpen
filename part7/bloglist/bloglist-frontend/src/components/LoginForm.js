import React from "react"
import loginService from "../services/login"
import { login } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import { useField } from "../hooks/useField"
import { postNotification } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"
import { TextField, Button, Box } from "@material-ui/core"

const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { clear: clearUsername, ...username } = useField("text")
    const { clear: clearPassword, ...password } = useField("password")

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("login:", {
            username: username.value,
            password: password.value
        })
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })

            clearUsername()
            clearPassword()

            dispatch(login(user))

            history.push("/")


        } catch (exception) {
            console.log(exception)
            dispatch(postNotification("credentials not accepted", "warning"))
        }
    }

    return (
        <form onSubmit={handleLogin} id="login-form">
            <div>
                <TextField required
                    id="username-input"
                    label="username"
                    {...username}
                />
            </div>
            <div>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    {...password}
                    autoComplete="current-password"
                />
            </div>
            <Box p={1}>
                <Button variant="contained" color="primary" type="submit">
                    login
                </Button>
            </Box>
        </form>
    )
}

export default LoginForm