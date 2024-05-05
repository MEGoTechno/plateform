import { Avatar, Card, CardHeader, CardMedia, useTheme } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'

export default function ShowImg({ file }) {
    const theme = useTheme()

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.background.alt, direction: "ltr" }}>
            <CardMedia
                component={"img"}
                sx={{ height: 140 }}
                image={file.url}
                title="green iguana"
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                }
                title={file.original_filename}
                subheader={`size: ${file.size / 1000000} mg`}
            />
        </Card>
    )
}
