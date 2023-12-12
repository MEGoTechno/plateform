import { Box, Button, Chip, Divider, Grid, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../tools/Header'
import VidCard from './VidCard'
import { getSameValue } from '../tools/commonFC'
import NotFound from '../tools/NotFound'

export default function ShowLectures() {
    const [value, setValue] = useState(0)
    const [lessonLectures, setLessonLectures] = useState([])
    const location = useLocation()

    // get lectures & lessons from state
    if (location.state) {
        var { lectures, lessons, grade } = location.state
    }

    const handleLessonLectures = (lesson, i) => {
        const sameLesson = getSameValue(lectures, "lessonId", lesson.lessonId)
        setLessonLectures(sameLesson)
        setValue(i)
    }

    useEffect(() => {
        if (location.state) {
            handleLessonLectures(lessons[0], 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessons])

    if (!location.state) {
        return <NotFound />
    }

    return (
        <Box sx={{ m: "20px 0" }}>
            <Divider>
                <Grid container spacing={2}>
                    {lessons && lessons.map((lesson, i) => (
                        <Grid key={i} item md={4} sm={6} xs={6} width={{ md: 500, sm: 350, xs: 250 }}>
                            <Chip
                                sx={{ width: "100%" }}
                                label={lesson.lessonName}
                                variant={i === value ? "filled" : "outlined"}
                                color='success'
                                onClick={() => handleLessonLectures(lesson, i)} />
                        </Grid>
                    ))}
                </Grid>
            </Divider>

            <Header title={lessons[value].lessonName} />

            <Grid container spacing={2}>
                {lessonLectures && lessonLectures.map((lessonLecture, i) => (
                    <Grid key={i} item md={6} xs={12}>
                        <VidCard key={i} lecture={lessonLecture} lessonLectures={lessonLectures} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

