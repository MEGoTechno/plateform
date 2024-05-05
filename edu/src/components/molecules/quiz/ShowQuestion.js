import { Box, Button, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

function ShowQuestion({ currentQuestion, isLoading }) {
    const theme = useTheme()

    const [question, setQuestion] = useState({})


    useEffect(() => {
        setQuestion(currentQuestion)
    }, [currentQuestion])

    return (

        <CardContent>
            <Box>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    question index
                </Typography>
                <Typography variant="h5" component="div">
                    {question.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    mark: /{question.points}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    hint:  {question.hints}
                </Typography>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    {question.options && question.options.map((option, i) => {
                        return (
                            <Grid key={i} item xs={12} md={6}>
                                <Chip
                                    sx={{ width: "100%", fontSize: "16px", color: theme.palette.secondary[100], fontWeight: 600, transition: "none" }}
                                    color={question.chosenOptionId === option.id ? "success" : "secondary"}
                                    label={option.title}
                                    variant={question.chosenOptionId === option.id ? "filled" : "outlined"}
                                    size='string'
                                    disabled={isLoading}
                                    onClick={() => {
                                        setQuestion(pre => {
                                            return { ...pre, chosenOptionId: option.id }
                                        })
                                        currentQuestion.chosenOptionId = option.id
                                    }} />
                            </Grid>
                        )
                    })}

                </Grid>
            </Box>
        </CardContent>
    )
}
// image
export default ShowQuestion
