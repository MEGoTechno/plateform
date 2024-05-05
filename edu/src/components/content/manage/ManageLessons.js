import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import Header from '../../tools/Header'
import { buttonStyle } from '../../../styles/buttonsStyles'
import LessonSettings from '../../molecules/LessonSettings'
import LectureSettings from './actions/LectureSettings'
import MakeTitle from "../../tools/MakeTitle"
import { useSelector } from 'react-redux'
import ChipHeader from '../../molecules/ChipHeader'

export default function ManageLessons() {

    const location = useLocation()
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [lessonLectures, setLessonLectures] = useState([])
    const { lang } = useSelector(s => s.global)
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

        const gradeId = grade._id
        const gradeName = grade.gradeName

        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName

        navigate("/management/lectures/add", {
            state: {
                gradeId, gradeName, unitId, unitName
            }
        })
    }

    const editLesson = (lesson) => {
        navigate("/management/lectures/edit-name", { state: { changeKey: "lessonName", by: "lessonId", value: lesson.lessonName, id: lesson.lessonId } })
    }

    const createLecture = () => {

        const gradeId = grade._id
        // const gradeName = grade.gradeName

        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName

        const lessonId = lessons[value].lessonId
        const lessonName = lessons[value].lessonName


        navigate("/management/lectures/add", {
            state: {
                gradeId, unitId, unitName, lessonId, lessonName
            }
        })
    }

    const editLecture = (lecture) => {
        navigate("/management/lectures/edit", {
            state: lecture
        })
    }

    return (
        <Box sx={{ mt: "20px" }}>
            <ChipHeader lessons={lessons} value={value} handleFc={handleLessonLectures} createLesson={createLesson} />

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
