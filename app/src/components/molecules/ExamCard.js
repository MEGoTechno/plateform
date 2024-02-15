import styled from '@emotion/styled'
import { Alert, Box, Button, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { FlexInBetween } from '../tools/FlexInBetween'
import { buttonStyle } from '../styles/buttonsStyles'
import ModalControlled from '../tools/ModalControlled'

export default function ExamCard({ exam, isManage, editExam, startExam }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)


    const total = exam.questions.reduce((acc, question)=> {
        return acc += question.point
    }, 0)

    const ExamTypoKey = styled(Typography)({
        p: 1, fontSize: "14px", fontWeight: "600"
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, fontsize: "12px"
    })

    // console.log(theme.palette)

    return (
        <Box
            sx={{
                m: "30px 0",
                p: 2,
                bgcolor: theme.palette.background.alt,
                borderRadius: '8px',
                display: "flex", justifyContent: "center", flexWrap: "wrap", flexDirection: "column"
            }}>

            <Box>

                <ExamTypoKey sx={{ textAlign: "center", m: "5px 0" }}>{exam.partName}</ExamTypoKey>

                <Divider color={theme.palette.primary[300]} />

                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.time}:</ExamTypoKey>
                    <ExamTypoValue>{(exam.time / 60 )|| "--"} min</ExamTypoValue>
                </FlexInBetween>

                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.nums}:</ExamTypoKey>
                    <ExamTypoValue>{exam.questions.length}</ExamTypoValue>
                </FlexInBetween >

                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.degree}:</ExamTypoKey>
                    <ExamTypoValue>{exam.total || exam.questions.length * 5}</ExamTypoValue>
                </FlexInBetween>

            </Box>

            <Divider color={theme.palette.primary[300]} />

            {isManage ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2
                }}>
                    <Button onClick={() => editExam(exam)} sx={buttonStyle}>{lang.exams.editExam}</Button>
                    {/* <Button onClick={shoModal}
                        sx={buttonStyle}
                        disabled={loading ? true : false}
                    >{loading ? <Loader /> : lang.exams.removeExam}</Button> */}
                </Box>

            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2
                }}>
                    <Button onClick={() => startExam(exam)} sx={buttonStyle}  >{lang.exams.start}</Button>
                </Box>
            )}
            {alert.state && <Alert severity={alert.state}>{alert.message}</Alert>}

            {/* <ModalControlled
                title={settings.title}
                action={removeExam}
                isShowModal={settings.isShowModal}
                close={() => setSettings(false)} /> */}
        </Box>
    )
}
