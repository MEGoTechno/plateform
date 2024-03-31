import { Box, Button, Card, CardActions, CardContent, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import Video from './Video'
import VidDetails from './VidDetails'
import { useLocation } from 'react-router-dom'
import VidCard from '../VidCard'
import NotFound from '../../tools/NotFound'

export default function VidPage() {
    
    const { state } = useLocation()
    const { lecture, lessonLectures } = state

    if (!state) {
        return <NotFound />
    }

    return (
        <Box sx={{ m: "20px 0" }}>
            <Box>
                <Video lecture={lecture} />
            </Box>
            <Box m={"6px 0"} >
                <VidDetails lecture={lecture} />
            </Box>

            <Grid container spacing={2} justifyContent={"center"}>

                {lessonLectures && lessonLectures.map((lessonLecture, i) => (
                    lessonLecture.partId !== lecture.partId && (
                        
                        <Grid key={i} item md={6} xs={12}>
                            <VidCard key={i} lecture={lessonLecture} lessonLectures={lessonLectures} />
                        </Grid>
                    )
                ))}

            </Grid>
        </Box >
    )
}
