import React from "react"
import { useSelector } from "react-redux"
import { Alert } from '@material-ui/lab'
import { Box } from "@material-ui/core"


const Notification = () => {
    const message = useSelector(state => state.notification)

    if (!message.text) {
        return null
    }
    console.log("message", message.text)

    return (
        <Box p={2} >
            <Alert severity={message.type} >
                {message.text}
            </Alert>
        </Box>
    )
}

export default Notification