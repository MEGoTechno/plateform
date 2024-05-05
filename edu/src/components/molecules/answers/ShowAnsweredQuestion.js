import { Box, Button, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

function ShowAnsweredQuestion({ currentQuestion, index }) {
    const theme = useTheme()

    const [question, setQuestion] = useState({})

    const isRightQuestion = (question.chosenOptionId === question.rtOptionId)
    const isNotAnswered = question.chosenOptionId === 'Not answered' || !question.chosenOptionId

    // console.log(theme.palette)
    useEffect(() => {
        setQuestion(currentQuestion)
    }, [currentQuestion])

    return (

        <CardContent>
            <Box>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    question {index + 1}
                </Typography>

                <Typography variant="h5" component="div" mb={1.5}>
                    {question.title}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography color="text.secondary">
                        mark : {question.chosenOptionId === question.rtOptionId ? question.points : 0}
                        /{question.points}
                    </Typography>

                    <Chip label={isNotAnswered ? "not answered" : isRightQuestion ? "right" : "wrong"} size='small' color={isRightQuestion ? "success" : 'error'} sx={{ m: "0 5px", transition: "none" }} />
                </Box>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    hint:  {question.hints}
                </Typography>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    {question.options && question.options.map((option, i) => {

                        const isChosenOption = (question.chosenOptionId === option.id)

                        const isWrong = isChosenOption && !isRightQuestion

                        const isRight = (question.rtOptionId === option.id)

                        return (
                            <Grid key={i} item xs={12} md={6}>
                                <Chip
                                    sx={{
                                        width: "100%",
                                        fontSize: "16px",
                                        color: isRight || isWrong ? theme.palette.grey[100] : theme.palette.neutral[50],
                                        fontWeight: 600, transition: "none",
                                        '& .MuiChip-label': {
                                            overflow: 'visible',
                                        },
                                    }}
                                    color={isRight ? "success" : isWrong ? "error" : "secondary"}
                                    label={option.title}
                                    variant={isRight || isWrong ? "filled" : "outlined"}

                                    size='string' />
                            </Grid>
                        )
                    })}

                </Grid>
            </Box>
        </CardContent>
    )
}
// image
export default ShowAnsweredQuestion
