import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import ShowMessages from './ShowMessages'
import { useNavigate } from 'react-router-dom'
import { sendSuccess } from '../styles/buttonsStyles'
import LoaderSkeleton from '../tools/LoaderSkeleton'

export default function Messages({ messages }) {
    const navigate = useNavigate()

    if (!messages) return <LoaderSkeleton />
    
    return (
        <Box>
            <ShowMessages messages={messages} />
            <Button sx={sendSuccess} style={{ width: "auto", margin: '20px 0' }} onClick={() => navigate("/messages/send")}>send message</Button>
        </Box>
    )
}
