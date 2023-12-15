import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import Header from '../../tools/Header'
import { buttonStyle } from '../../styles/buttonsStyles'
import LessonSettings from './LessonSettings'
import LectureSettings from './LectureSettings'
import MakeTitle from "../../tools/MakeTitle"
import { useSelector } from 'react-redux'

export default function ManageLessons() {

    const location = useLocation()
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [lessonLectures, setLessonLectures] = useState([])
    const {lang} = useSelector(s => s.global)
    const { lectures, lessons, grade } = location.state

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



    const createLesson = () => {
        let i = lessons.length + 1
        const gradeId = grade.gradeId
        const gradeName = grade.gradeName
        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName
        const lessonId = unitId + `l${i}`
        const partId = lessonId + `p1`
        console.log({ gradeId, gradeName, unitId, unitName, lessonId, partId })
        navigate("/management/content/add-lecture", {
            state: {
                gradeId, gradeName, unitId, unitName, lessonId, partId
            }
        })
    }

    const editLesson = (lesson) => {
        navigate("/management/content/edit", { state: { changeKey: "lessonName", by: "lessonId", value: lesson.lessonName, id: lesson.lessonId } })
    }

    const createLecture = () => {
        let i = lessonLectures.length + 1
        const gradeId = grade.gradeId
        const gradeName = grade.gradeName

        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName

        const lessonId = lessons[value].lessonId
        const lessonName = lessons[value].lessonName
        const partId = lessonId + `p${i}`

        navigate("/management/content/add-lecture", {
            state: {
                gradeId, gradeName, unitId, unitName, lessonId, lessonName, partId
            }
        })
    }

    const editLecture = (lecture) => {
        navigate("/management/content/edit-lecture", {
            state: lecture
        })
    }

    return (
        <Box sx={{ mt: "20px" }}>
            <Divider>
                <Grid container spacing={2}>
                    {lessons && lessons.map((lesson, i) => (
                        <Grid key={i} item md={4} sm={6} xs={6} width={{ md: 500, sm: 350, xs: 250 }}>
                            <Chip
                                key={i} sx={{ width: "100%" }}
                                label={lesson.lessonName}
                                variant={i === value ? "filled" : "outlined"}
                                color='success'
                                onClick={() => handleLessonLectures(lesson, i)} />
                        </Grid>
                    ))}
                    <Grid item md={4} sm={6} xs={6} width={{ md: 500, sm: 350, xs: 250 }}>
                        <Chip sx={{ width: "100%" }} label={lang.content.addLesson} variant="outlined" color='warning' onClick={createLesson} />
                    </Grid>
                </Grid>
            </Divider>


            <Box >
                <Header title={lessons[value].lessonName} />
                <LessonSettings lesson={lessons[value]} lectures={lessonLectures} editLesson={editLesson} createLecture={createLecture} />
            </Box>

            <Stack direction="column" spacing={2}>
                <MakeTitle title={lang.content.manageVids} />

                <Box sx={{
                    display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", alignItems: "center", gap: 2, flexWrap: "wrap"
                }}>
                    {lessonLectures && lessonLectures.map((lessonLecture, i) => (
                        <LectureSettings key={i} lecture={lessonLecture} editLecture={editLecture} />
                    ))}
                </Box>

            </Stack>
        </Box>
    )
}
