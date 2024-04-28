import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import Header from '../../tools/Header'
import { buttonStyle } from '../../../styles/buttonsStyles'
// import LessonSettings from './LessonSettings'
// import LectureSettings from './LectureSettings'
import MakeTitle from "../../tools/MakeTitle"
import { useSelector } from 'react-redux'
import ChipHeader from '../../molecules/ChipHeader'

import LessonExamsSettings from '../../molecules/LessonExamsSettings'
import ExamCard from '../../molecules/ExamCard'

export default function ManageLessonsExams() {

    const location = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)

    const [value, setValue] = useState(0)
    const [lessonLectures, setLessonLectures] = useState([])
    const { exams, lessons, grade } = location.state

    const handleLessonLectures = (lesson, i) => {
        const lessonExams = getSameValue(exams, "lessonId", lesson.lessonId)
        setLessonLectures(lessonExams)
        setValue(i)
    }

    // lessons Fc
    const createLesson = () => {

        const gradeId = grade._id

        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName

        navigate("/management/exams/add", {
            state: {
                gradeId, unitId, unitName
            }
        })
    }

    const editLesson = (lesson) => {
        navigate("/management/exams/edit-name", { state: { changeKey: "lessonName", by: "lessonId", value: lesson.lessonName, id: lesson.lessonId } })
    }


    // exams Fc
    const createExam = () => {
        const gradeId = grade._id

        const unitId = lessonLectures[0].unitId
        const unitName = lessonLectures[0].unitName

        const lessonId = lessons[value].lessonId
        const lessonName = lessons[value].lessonName

        navigate("/management/exams/add", { state: { gradeId, unitId, unitName, lessonId, lessonName } })
    }

    const editExam = (exam) => {
        navigate("/management/exams/edit", {
            state: exam
        })
    }



    useEffect(() => {
        if (location.state) {
            handleLessonLectures(lessons[0], 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessons])

    // header for ==> lessons || lessonExam settings ==> lesson and create exam || every exam => edit exam

    return (
        <Box sx={{ mt: "20px" }}>
            <ChipHeader lessons={lessons} value={value} handleFc={handleLessonLectures} createLesson={createLesson} />

            <Box >
                <Header title={lessons[value].lessonName} />
                <LessonExamsSettings lesson={lessons[value]} exams={lessonLectures} editLesson={editLesson} createExam={createExam} />
            </Box>

            <Stack direction="column" spacing={2}>
                <MakeTitle title={"exams"} />
            </Stack>

            <Grid container spacing={2} justifyContent={"center"}>
                {lessonLectures && lessonLectures.map((exam, i) => {
                    return (
                        <Grid key={i} item xs={12} sm={6} md={4} >
                            <ExamCard exam={exam} isManage={true} editExam={editExam} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
