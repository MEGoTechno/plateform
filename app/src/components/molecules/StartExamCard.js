import { Alert, Box, Button, Card, CardActions, CardContent, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { buttonError, buttonStyle, sendSuccess } from '../styles/buttonsStyles'
import { useSearchParams } from 'react-router-dom'

import Dayjs from "dayjs"
import styled from '@emotion/styled'

const startIn = (startDate) => {

    var dateStart = new Date(startDate);
    var dd = String(dateStart.getDate()).padStart(2, '0');
    var mm = String(dateStart.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateStart.getFullYear();
    var time = dateStart.toLocaleTimeString()

    return dd + '/' + mm + '/' + yyyy + ': => ' + time;
}



export default function StartExamCard({ exam, setStart, getBack, attempts, setSearchParams }) {
    const theme = useTheme()
    const [isActive, setActive] = useState(false)
    const [isShowAnswers, setShowAnswers] = useState(false)

    useEffect(() => {
        if (attempts?.length > 0 && exam.isShowAnswers) {
            setShowAnswers(true)
        }

        const activateExam = (exam) => {

            if (exam.isActive) {

                if (exam.dateStart && exam.dateEnd) {
                    const nowDate = new Date()
                    const startDate = new Date(exam.dateStart)
                    const endDate = new Date(exam.dateEnd)

                    startDate.getTime() < nowDate.getTime() && nowDate.getTime() < endDate.getTime() ? setActive(true) : setActive(false)
                } else if (exam.dateStart) {

                    const nowDate = new Date()
                    const startDate = new Date(exam.dateStart)

                    startDate.getTime() < nowDate.getTime() ? setActive(true) : setActive(false)

                } else {
                    setActive(true)
                }
            } else {
                setActive(false)
            }
        }


        activateExam(exam)
    }, [exam, attempts])


    const ExamTypoKey = styled(Typography)({
        p: 1, fontSize: "14px",
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, fontsize: "12px", color: theme.palette.secondary[200], fontWeight: "600"
    })


    return (
        <Card sx={{ bgcolor: theme.palette.background.alt }}>
            <CardContent>

                <Typography color="text.secondary">
                    lesson name
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                    {exam.lessonName}
                </Typography>

                <Typography color="text.secondary">
                    part name
                </Typography>
                <Typography variant="h5" component="div">
                    {exam.partName}
                </Typography>

                <Typography mt={1.5} color="text.secondary">
                    important information
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flexStart', gap: '5px', m: '8px 0' }}>
                    <ExamTypoKey>questions time: </ExamTypoKey>
                    <ExamTypoValue>{(exam.time / 60)} min</ExamTypoValue>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flexStart', gap: '5px', m: '8px 0' }}>
                    <ExamTypoKey>questions number: </ExamTypoKey>
                    <ExamTypoValue>{exam.questions.length} question</ExamTypoValue>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flexStart', gap: '5px', m: '8px 0' }}>
                    <ExamTypoKey>exam attempts: </ExamTypoKey>
                    <ExamTypoValue>{exam.attemptsNums || 1} attempt</ExamTypoValue>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flexStart', gap: '5px', m: '8px 0' }}>
                    <ExamTypoKey>availalble attempts : </ExamTypoKey>
                    <ExamTypoValue>{(exam.attemptsNums - attempts?.length === 0 ? "0" : exam.attemptsNums - attempts?.length) || 1} attempt</ExamTypoValue>
                </Box>

                {/* <Box sx={{ display: 'flex', justifyContent: 'flexStart', gap: '5px', m: '8px 0' }}>
                    <ExamTypoKey>starts in : </ExamTypoKey>
                    <ExamTypoValue>{exam.dateStart && startIn(exam.dateStart)}</ExamTypoValue>
                </Box> */}


                <Typography mt={1.5} color="text.secondary">
                    previous attempts
                </Typography>

                <Grid>
                    {(attempts?.length > 0) ? attempts.map(((attempt, i) => {
                        return (
                            <Button sx={sendSuccess} disabled={!isShowAnswers} key={i} onClick={() => setSearchParams(params => {
                                params.set("attempt", i + 1)
                                return params
                            })}>attempt {i + 1} </Button>
                        )
                    })) : "No previous"}
                </Grid>

                <Alert sx={{ mt: 1.5 }} severity="warning">If you start test you can`t get back.</Alert>

            </CardContent>

            <CardActions>
                <Button onClick={getBack} sx={buttonError} size="small">back</Button>

                {
                    (exam.attemptsNums > attempts.length && isActive) &&
                    <Button onClick={() => setStart(true)} sx={buttonStyle} size="small">start</Button>
                }
            </CardActions>
        </Card>
    )
}