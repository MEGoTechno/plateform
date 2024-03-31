import { CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function LectureSettingsContent({thumbnail, lang, lecture}) {
    return (
        <div>
            <CardMedia
                component="img"
                height={140}
                image={thumbnail}
                alt="no images"
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {lang.content.lectureName}
                </Typography>
                <Typography variant="h5" component="div">
                    {lecture.partName}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                    {lang.content.Description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {lecture.description}
                </Typography>
            </CardContent>
        </div>
    )
}
