import { Box, Button, Card, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { buttonStyle } from '../../styles/buttonsStyles'
import { useSelector } from 'react-redux'

export default function LessonSettings({ lesson, lectures, editLesson, createLecture }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)

    return (

        <Card sx={{ minWidth: 275, direction: "rtl", bgcolor: theme.palette.background.alt }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {lang.content.settings}
                </Typography>
                <Typography variant="h5" component="div">
                    {lesson.gradeName} {'>'} {lesson.unitName}  {'>'} {lesson.lessonName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {lang.content.description}
                </Typography>
                <Box>
                    <Typography variant="body2">
                        {lang.content.lectureNums}  :  {lectures.length}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button sx={buttonStyle} onClick={() => editLesson(lesson)} size="small">{lang.content.editLesson}</Button>
                <Button sx={buttonStyle} onClick={createLecture} size="small">{lang.content.addLecture}</Button>
            </CardActions>
        </Card>
    )
}
