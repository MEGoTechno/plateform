import { Chip, Divider, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ChipHeader(props) {
    const { lang } = useSelector(s => s.global)
    const { lessons, value, handleFc, createLesson } = props

    return (
        <Divider>
            <Grid container spacing={2}>

                {lessons && lessons.map((lesson, i) => (
                    <Grid key={i} item xs={6} md={4} width={{ md: 500, sm: 350, xs: 250 }}>
                        <Chip
                            key={i} sx={{ width: "100%" }}
                            label={lesson.lessonName}
                            variant={i === value ? "filled" : "outlined"}
                            color='success'
                            onClick={() => handleFc(lesson, i)} />
                    </Grid>
                ))}

                <Grid item xs={6} md={4} width={{ md: 500, sm: 350, xs: 250 }}>
                    <Chip sx={{ width: "100%" }} label={lang.content.addLesson} variant="outlined" color='warning' onClick={createLesson} />
                </Grid>

            </Grid>
        </Divider>
    )
}

