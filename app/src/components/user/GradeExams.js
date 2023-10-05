import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, IconButton, Typography, styled, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Header from '../tools/Header'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlexInBetween } from '../tools/FlexInBetween';
import { useSelector } from 'react-redux';


export default function GradeExams() {

    const theme = useTheme()

    const [isExpanded, setExpanded] = useState(false)
    const { lang } = useSelector(s => s.global)

    const ExamTypoKey = styled(Typography)({
        p: 1, color: theme.palette.secondary[500], fontSize: "14px", fontWeight: "600"
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, color: theme.palette.secondary[400], fontsize: "12px"
    })

    // grade --- units --- lesssons --- parts
    const gradeDataExams = [{
        gradeId: "grade1",
        units: [{
            unitId: "unit1",
            unitName: lang.exams.unit + " " + 1,
            lessons: [{
                lessonId: "lesson1",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part2",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part3",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }, {
                lessonId: "lesson2",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }]
        }, {
            unitId: "unit2",
            unitName: lang.exams.unit + " " + 2,
            lessons: [{
                lessonId: "lesson1",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part2",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part3",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }, {
                lessonId: "lesson2",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }]
        }, {
            unitId: "unit3",
            unitName: lang.exams.unit + " " + 3,
            lessons: [{
                lessonId: "lesson1",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part2",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }, {
                    partId: "part3",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }, {
                lessonId: "lesson2",
                lessonName: "DNA",
                parts: [{
                    partId: "part1",
                    questions: [{
                        questionId: "",
                        questionName: "",
                        options: [{
                            optionId: "",
                            optionName: ""
                        }]
                    }]
                }]
            }]
        }]
    }]



    const createExam = (exam) => {
        return (
            <Box
                key={exam.partId}
                sx={{
                    m: "30px 0",
                    p: 2,
                    bgcolor: theme.palette.primary[600],
                    borderRadius: '8px',
                    display: "flex", justifyContent: "center", flexWrap: "wrap", width: "250px", flexDirection: "column"
                }}>
                <Box>
                    <ExamTypoKey sx={{ textAlign: "center", m: "5px 0" }}>DNA and RNA</ExamTypoKey>
                    <Divider color={theme.palette.primary[300]} />
                    <FlexInBetween sx={{ m: "5px 0" }}>
                        <ExamTypoKey>{lang.exams.time}:</ExamTypoKey>
                        <ExamTypoValue>45min</ExamTypoValue>
                    </FlexInBetween>
                    <FlexInBetween sx={{ m: "5px 0" }}>
                        <ExamTypoKey>{lang.exams.nums}:</ExamTypoKey>
                        <ExamTypoValue>42q</ExamTypoValue>
                    </FlexInBetween >
                    <FlexInBetween sx={{ m: "5px 0" }}>
                        <ExamTypoKey>{lang.exams.degree}:</ExamTypoKey>
                        <ExamTypoValue>50</ExamTypoValue>
                    </FlexInBetween>
                </Box>
                <Divider color={theme.palette.primary[300]} />
                <Button sx={{
                    mt: 1,
                    ml: "auto", width: "100%",
                    bgcolor: theme.palette.background.alt,
                    color: theme.palette.secondary[300],
                    fontWeight: "600",
                    "&:hover": {
                        bgcolor: theme.palette.secondary[300],
                        color: theme.palette.background.alt,

                    }
                }}>{lang.exams.start}</Button>
            </Box>
        )
    }

    return (
        <Box>
            {gradeDataExams[0].units.map(unit => {
                return (
                    <Accordion key={unit.unitId} sx={{
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        mb: 5, mt: 1, direction: lang.direction
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
                            {unit.lessons.map(lesson => {
                                return (
                                    <Box key={lesson.lessonId}>
                                        <Typography variant='h4' fontWeight="600">{lang.exams.lesson} : {lesson.lessonName}</Typography>
                                        <Typography variant='h6' ml={1} sx={{ opacity: .6 }}>{lang.exams.subtitle}</Typography>
                                        <Divider color={theme.palette.primary[300]} />
                                        <FlexInBetween width="100%" flexWrap="wrap">
                                            {lesson.parts.map(part =>
                                                (createExam(part))
                                            )}
                                        </FlexInBetween>
                                    </Box>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}


// {gradeExamsData.map(exam => {
//     // make units
//     const createdUnit = examsManagement.find(examManagement => examManagement.unitId === exam.unitId)
//     const createdLesson = examsManagement.find(examManagement => examManagement.lessonId === exam.lessonId)
//     if (createdUnit) {

//     } else {
//         examsManagement.push(exam, createdLesson)
//         createUnit(exam)
//     }
//     // make lessons
// })}