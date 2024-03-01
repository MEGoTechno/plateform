import { Box, Button, Card, CardActions, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { buttonStyle } from '../../styles/buttonsStyles'
import QuizPagination from '../quiz/QuizPagination'
import ShowAnsweredQuestion from './ShowAnsweredQuestion'

export default function AttemptCard({ exam, isAnsweres }) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const disabledNext = exam.questions.length <= 0 || exam.questions.length === (currentQuestionIndex + 1) ? true : false
    const disabledPre = exam.questions.length <= 0 || (currentQuestionIndex) === 0 ? true : false

    const theme = useTheme()

    return (
        <Card sx={{ bgcolor: theme.palette.background.alt, width: "100%" }} >

            <ShowAnsweredQuestion currentQuestion={exam.questions[currentQuestionIndex]} index={currentQuestionIndex} />

            <CardActions>
                <Button sx={buttonStyle} disabled={disabledPre} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                    previous question
                </Button>
                <Button sx={buttonStyle} disabled={disabledNext} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                    next question
                </Button>

            </CardActions>

            <Box >
                <QuizPagination isAnsweres={isAnsweres} examQuestions={exam.questions} count={exam.questions.length} index={currentQuestionIndex} setIndex={setCurrentQuestionIndex} />
            </Box>
        </Card>
    )
}
