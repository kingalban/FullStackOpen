import React, { useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from "../queries/queries"

const LoginForm = ({ setError, setToken, show }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // setError("login...")

    const [ login, result ] = useMutation(LOGIN, {    onError: (error) => {
        setError(error.graphQLErrors[0].message)
        setTimeout(() => setError(null), 3000)
      }
    })

    useEffect(() => {    
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)    
        } 
    }, [result.data]) // eslint-disable-line
    
    const handleLogin = async (event) => {
        event.preventDefault()

        if(!username || !password) {
            return null
        }
        
        setUsername('')
        setPassword('')
        login({ variables: { username, password } })
    }

    if (!show) {
        return null
    }

    return (
        <div>
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            <label htmlFor="password">Username:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type='submit'>create book</button>
        </form>
        </div>
    )
}

export default LoginForm