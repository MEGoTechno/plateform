import { Box, Button, Card, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { buttonStyle } from '../../styles/buttonsStyles'

export default function LessonSettings({ lesson, lectures, editLesson, createLecture }) {
    const theme = useTheme()
    return (

        <Card sx={{ minWidth: 275, direction: "rtl", bgcolor: theme.palette.background.alt }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Settings
                </Typography>
                <Typography variant="h5" component="div">
                    {lesson.gradeName} {'>'} {lesson.unitName}  {'>'} {lesson.lessonName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    description
                </Typography>
                <Box>
                    <Typography variant="body2">
                        lecture numbers :  {lectures.length}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                    <Button sx={buttonStyle} onClick={() => editLesson(lesson)} size="small">edit lesson</Button>
                    <Button sx={buttonStyle} onClick={createLecture} size="small">add lecture</Button>
            </CardActions>
        </Card>
    )
}
