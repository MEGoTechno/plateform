import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Typography, useTheme } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlexInBetween } from '../tools/FlexInBetween';
import { useDispatch, useSelector } from 'react-redux';
import CreateExam from './CreateExam';
import React, { useEffect, useMemo, useState } from 'react';
import { getUnique } from '../tools/commonFC';
import { editExamSettings, resetExamState } from '../../toolkit/examSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { buttonStyle, sendSuccess } from '../styles/buttonsStyles';

export default function CreateUnit({ grade, units, exams }) {
    const { lang } = useSelector(s => s.global)
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isManage = location.pathname.split("/")[1] === "management"

    const handleAddExam = ({ gradeId, gradeName, unitId, unitName, lessonId, lessonName }) => {
        let i = 1
        exams.forEach((exam => {
            if (exam.lessonId === lessonId) {
                i += 1
                return i
            }
        }))
        const partId = lessonId + `p${i}`
        dispatch(editExamSettings({ gradeId, gradeName, unitId, unitName, lessonId, lessonName, partId }))
        navigate("/management/exams/add-exam")
    }
    const handleAddExamLesson = ({ gradeId, gradeName, unitId, unitName }) => {
        let i = 1
        exams.forEach((exam) => {
            if (exam.unitId === unitId) {
                i += 1
            }
        })
        const lessonId = unitId + `l${i}`
        const partId = lessonId + `p1`
        dispatch(resetExamState())
        dispatch(editExamSettings({ gradeId, gradeName, unitId, unitName, lessonId, partId }))
        navigate("/management/exams/add-exam")
    }

    const handleAddExamUnit = (units) => {
        let i = units.length + 1
        const gradeId = grade.gradeId
        const gradeName = grade.gradeName
        const unitId = grade.gradeId + `u${i}`
        const lessonId = unitId + `l1`
        const partId = lessonId + `p1`
        dispatch(resetExamState())
        dispatch(editExamSettings({ gradeId, gradeName, unitId, lessonId, partId }))
        navigate("/management/exams/add-exam")
    }

    let getLessons = []
    let lessons = []
    if (exams) {
        exams.forEach((exam) => {
            if (exam.gradeId === grade.gradeId) {
                getLessons.push(exam)
            }
        })
        lessons = getUnique(getLessons, "lessonId")
    }

    // units, lessons
    // last unit in g, lest lesson in unit
    if (!units || units?.length === 0) {

        return <>
            <Alert severity='error'> لا يوجد اختبارات لهذه السنه</Alert>
            {isManage && (
                <Button sx={sendSuccess} onClick={() => {
                    handleAddExamUnit(units)
                }}>{lang.exams.addUnitExam}</Button>
            )}
        </>
    }


    return (
        <Box>
            {units && units.map((unit, i) => {
                return (
                    <Accordion key={i} sx={{
                        mb: 5, mt: 1, bgcolor: theme.palette.background.alt, direction: lang.direction
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant='h4' fontWeight="600"> {unit.unitName}</Typography>
                        </AccordionSummary>
                        {/* the content */}
                        <AccordionDetails>
                            {lessons && lessons.map((lesson) => {
                                return (
                                    lesson.unitId === unit.unitId && (
                                        <Box key={lesson.lessonId} sx={{ direction: lang.direction }}>
                                            <FlexInBetween>
                                                <Box>
                                                    <Typography variant='h4' fontWeight="600" mb={1}>{lang.exams.lesson} : {lesson.lessonName}</Typography>
                                                    {/* <Typography variant='h6' ml={1} sx={{ opacity: .6 }}>{lang.exams.subtitle}</Typography> */}
                                                </Box>
                                            </FlexInBetween>
                                            <Divider color={theme.palette.primary[300]} />
                                            <Box>
                                                <Box key={i} sx={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                                                    {exams && exams.map((exam, i) => {
                                                        return (
                                                            exam.lessonId === lesson.lessonId && (
                                                                <CreateExam key={i} exam={exam} isManage={isManage} />
                                                            )
                                                        )
                                                    })}
                                                </Box>
                                                {/* add exam in same lesson*/}
                                                {isManage && (
                                                    <Box>
                                                        <Button sx={buttonStyle} onClick={() => handleAddExam({
                                                            gradeId: lesson.gradeId,
                                                            gradeName: lesson.gradeName,
                                                            unitId: lesson.unitId,
                                                            unitName: lesson.unitName,
                                                            lessonId: lesson.lessonId,
                                                            lessonName: lesson.lessonName
                                                        })}>{lang.exams.addExam}</Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    )
                                )
                            })}
                            {isManage && (
                                <Button
                                    sx={buttonStyle}
                                    style={{ width: "auto" }}
                                    onClick={() => {
                                        handleAddExamLesson({
                                            gradeId: unit.gradeId,
                                            gradeName: unit.gradeName,
                                            unitId: unit.unitId,
                                            unitName: unit.unitName
                                        })
                                    }}>{lang.exams.addLessonExam}</Button>
                            )}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {isManage && (
                <Button sx={sendSuccess} onClick={() => {
                    handleAddExamUnit(units)
                }}>{lang.exams.addUnitExam}</Button>
            )}
        </Box >
    )
}
