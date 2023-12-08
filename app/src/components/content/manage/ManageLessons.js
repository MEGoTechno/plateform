import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import Header from '../../tools/Header'
import { buttonStyle } from '../../styles/buttonsStyles'
import LessonSettings from './LessonSettings'
import LectureSettings from './LectureSettings'

export default function ManageLessons() {

    const location = useLocation()
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [lessonLectures, setLessonLectures] = useState([])
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
        <Box>
            <Divider>
                <Box sx={{ m: "20px 0", display: "flex", justifyContent: "center" }}>
                    <Stack direction="row" spacing={2}>
                        {lessons && lessons.map((lesson, i) => (
                            <Chip key={i} label={lesson.lessonName} variant={i === value ? "filled" : "outlined"} color='success' onClick={() => handleLessonLectures(lesson, i)} />
                        ))}
                        <Chip label="add lesson" variant="outlined" color='success' onClick={createLesson} />
                    </Stack>
                </Box>
            </Divider>


            <Box >
                <Header title={lessons[value].lessonName} />
                <LessonSettings lesson={lessons[value]} lectures={lessonLectures} editLesson={editLesson} createLecture={createLecture} />
            </Box>

            <Stack direction="column" spacing={2}>
                <Typography variant='h3' textAlign={"center"}>lectures</Typography>

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
