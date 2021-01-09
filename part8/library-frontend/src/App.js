
import React, { useState, useEffect } from "react"
import { useApolloClient } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import SetBirthyear from "./components/SetBirthyear"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"
import Recommended from "./components/Recommended"

const App = () => {
    
    const [page, setPage] = useState("authors")
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    useEffect( () => {
        setToken(localStorage.getItem("phonenumbers-user-token")) 
    }, [])
    
    const logoutAction = () => {
        setToken(null)    
        setPage("authors")
        localStorage.clear()    
        client.resetStore()
    }

    if(page === "login" && token) {
        setPage("authors")
    }

    return (
        <div>
            <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            {token
            ? <>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={() => setPage("recommended")}>recommended</button>
                <button onClick={logoutAction}>logout</button>
            </>
            : <button onClick={() => setPage("login")}>login</button>
            }
            </div>

            <Notify
                errorMessage={errorMessage}
            />

            <Authors
                show={page === "authors"}
            />
            <SetBirthyear
                show={page === "authors"}
            />

            <Books
                show={page === "books"}
            />

            <NewBook
                show={page === "add"}
            />

            <Recommended
                show={page === "recommended"}
            />

            <LoginForm
                show={page === "login"}
                setToken={setToken}
                setError={setErrorMessage}
            />

        </div>
    )
}

export default App