import { Button } from '@mui/material'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

export default function Video({ lecture }) {
    const [playState, setPlayState] = useState(false)
    const src = lecture?.video?.url ? lecture?.video?.url : "/"

    return (
        <ReactPlayer
        style={{
            maxHeight: "100%"
        }}
            url={src}
            width="100%"
            muted={true}
            controls
            playing={playState}
        />
    )
}
