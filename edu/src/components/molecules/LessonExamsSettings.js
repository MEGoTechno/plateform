import { Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { buttonStyle } from '../../styles/buttonsStyles'

export default function LessonExamsSettings({ lesson, exams, createExam, editLesson }) {
    const { lang } = useSelector(s => s.global)
    const theme = useTheme()
    //minWidth: 275,
    return (
        <Card sx={{ direction: "rtl", bgcolor: theme.palette.background.alt }}>
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
                        {lang.content.lectureNums}  :  {exams.length}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button sx={buttonStyle} onClick={() => editLesson(lesson)} size="small">{lang.content.editLesson}</Button>
                <Button sx={buttonStyle} onClick={createExam} size="small">create exam</Button>
            </CardActions>
        </Card>
    )
}
