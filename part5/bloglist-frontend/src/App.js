import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState()

    console.log('render...')

    /*################

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        noteService.setToken(user.token)
        }
    }, [])



    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
        .update(id, changedNote)
        .then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
            setErrorMessage(
            `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)   
        })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    */


    // const addBlog = (event) => {
    //     event.preventDefault()
    //     const blogObject = {
    //         title:
    //     }

    //     blogService
    //     .create(blogObject)
    //     .then(returnedNote => {
    //         setNotes(notes.concat(returnedNote))
    //         setNewNote('')
    //     })
    // }
   
    // const blogForm = () => (
    //     <form onSubmit={addBlog}>
    //     <input
    //         value={newBlog}
    //         onChange={handleBlogChange}
    //     />
    //     <button type="submit">save</button>
    //     </form>  
    // )

    
    const loginForm = () => (
        <form onSubmit={handleLogin}>
        <div>
            username <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
        </form>      
    )

    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            
            // window.localStorage.setItem(
            //     'loggedNoteappUser', JSON.stringify(user)
            // ) 
            
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            console.log(exception)
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
        }
    }

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs( blogs )
            )  
    }, [])

    return (
        <div>
            <h2>blogs</h2>

            <Notification message={errorMessage} />

            
            {user === null 
                ?loginForm() 
                :<div>
                    <p>{user.name} logged in</p>
                    {/* {<p>blog form...</p>} */}
                </div>
            }
            
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        
        </div>
    )
}

export default App