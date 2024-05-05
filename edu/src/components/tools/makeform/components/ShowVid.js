import { Avatar, Card, CardHeader, CardMedia, useTheme } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'

export default function ShowVid({ file }) {
    const theme = useTheme()


    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.background.alt, direction: "ltr" }}>
            <ReactPlayer
                url={file.url}
                width="100%"
                height="200px"
                muted={true}
                controls
            />

            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        A
                    </Avatar>
                }
                title={file.original_filename}
                subheader={`size: ${file.size / 1000000} mg`}
            />
        </Card>
    )
}
