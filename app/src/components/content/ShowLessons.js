import { Box, Button, Chip, Divider, Stack } from '@mui/material'
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
        <Box>
            <Divider>
                <Box sx={{ m: "20px 0", display: "flex", justifyContent: "center" }}>
                    <Stack direction="row" spacing={2}>
                        {lessons && lessons.map((lesson, i) => (
                            <Chip key={i} label={lesson.lessonName} variant={i === value ? "filled" : "outlined"} color='success' onClick={() => handleLessonLectures(lesson, i)} />
                        ))}
                    </Stack>
                </Box>
            </Divider>

            <Header title={lessons[value].lessonName} />

            <Stack direction="column" spacing={2}>

                <Box sx={{
                    display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", alignItems: "center", gap: 2, flexWrap: "wrap"
                }}>
                    {lessonLectures && lessonLectures.map((lessonLecture, i) => (
                        <VidCard key={i} lecture={lessonLecture} lessonLectures={lessonLectures} />
                    ))}
                </Box>
            </Stack>
        </Box>
    )
}

