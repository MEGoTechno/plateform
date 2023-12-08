import { Button } from '@mui/material'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

export default function Video({ lecture }) {
    const [playState, setPlayState] = useState(false)
    const src = lecture.video ? `http://localhost:5050/elawadii/${lecture?.video}` : "/images/تعلم Git   GitHub درس 01_ - ما هو ال Git   Github ولماذا يجب أن أتعلمهم الجزء الأول(240P).mp4"

    return (
        <div>
            <ReactPlayer
                url={src}
                width="100%"
                height="100%"
                muted={true}
                controls
                playing={playState}
            />
            {/* <video src={"/images/تعلم Git   GitHub درس 01_ - ما هو ال Git   Github ولماذا يجب أن أتعلمهم الجزء الأول(240P).mp4"} width="600" height="300" controls="controls" autoPlay /> */}
        </div>
    )
}
