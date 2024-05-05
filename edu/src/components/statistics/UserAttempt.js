import { Box } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import NotFound from '../tools/NotFound'
import AnswersPage from '../exams/AnswersPage'

export default function UserAttempt() {
    const location = useLocation()
    const attempt = location.state

    if (!attempt) return <NotFound />
    return (
        <Box>
            <AnswersPage attempt={attempt} />
        </Box>
    )
}
