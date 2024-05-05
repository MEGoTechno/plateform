import { Card, CardContent, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function VidDetails({ lecture }) {
    const theme = useTheme()
    const {lang} = useSelector(s => s.global)

    return (
        <Card sx={{ minWidth: 275, direction: "right", backgroundColor: theme.palette.background.alt }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   {lang.content.lectureName}
                </Typography>
                <Typography variant="h5" component="div">
                    {lecture.partName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {lang.content.description}
                </Typography>
                <Typography variant="body2">
                    {lecture.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
