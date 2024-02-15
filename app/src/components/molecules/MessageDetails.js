import { Box, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function MessageDetails({ message }) {
    const theme = useTheme()
    console.log(message)
    return (
        <Box bgcolor={theme.palette.background.alt} p={"10px"} borderRadius={2}>
            <Typography variant="h5" gutterBottom>
                {message.userName}
            </Typography>

            <Typography variant="h6" gutterBottom>
                {message.subject}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {message.message}
            </Typography>
            <Divider>
                <Typography sx={{ opacity: .8 }} variant="h5" gutterBottom>
                    Answer
                </Typography>
            </Divider>
            {message.answer !== "not" ? (
                <>
                    <Typography variant="body1" gutterBottom>
                        {message.answer}
                    </Typography>
                </>
            ) :
                <Typography variant="body1" gutterBottom>
                    not answered
                </Typography>}
        </Box>
    )
}
