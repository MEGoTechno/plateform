import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import Video from './Video'
import VidDetails from './VidDetails'
import { useLocation } from 'react-router-dom'
import VidCard from '../VidCard'

export default function VidPage() {

    const { state } = useLocation()
    const { lecture, lessonLectures } = state
    
    return (
        <Box>
            <Box>
                <Video lecture={lecture} />
            </Box>
            <Box>
                <VidDetails lecture={lecture} />
            </Box>
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", alignItems: "center", gap: 2, flexWrap: "wrap"
            }}>
                {lessonLectures && lessonLectures.map((lessonLecture, i) => (
                    lessonLecture.id !== lecture.id && (
                        <VidCard key={i} lecture={lessonLecture} lessonLectures={lessonLectures} />
                    )
                ))}
            </Box>
        </Box>
    )
}
