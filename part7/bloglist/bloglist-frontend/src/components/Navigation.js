import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import {
    Toolbar,
    Button,
    Typography,
    AppBar,
    Box
} from '@material-ui/core'

const Navigation = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser)



    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Box width="100%" >
                        <Button color="inherit" component={Link} to="/" >
                            home
                        </Button>
                        <Button color="inherit" component={Link} to="/users" >
                            users
                        </Button>
                    </Box>

                    <Box flexShrink={0}>
                        {user
                            ? <Box display="flex" flexDirection="row" >
                                <Typography variant="h6" color="inherit"  >
                                    {user.name} logged in
                                </Typography>
                                <Button onClick={() => dispatch(logout())} id="logout-button" >
                                    logout
                                </Button>
                            </Box>
                            : 
                            <Button color="inherit" component={Link} to="/login" >
                                login
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </div>

    // <div style={{backgroundColor: "slateGray"}}>
    //     <Link style={style} to="/">blogs</Link>
    //     <Link style={style} to="/users">users</Link>
    //     {user
    //         ? <div style={style}>{user.name} logged in
    //             <button onClick={() => dispatch(logout())} id="logout-button">
    //                 logout
    //             </button>
    //         </div>
    //         :null
    //     }
    // </div>
    )
}

export default Navigation