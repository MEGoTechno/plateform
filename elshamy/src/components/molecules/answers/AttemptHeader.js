import { AppBar, Box, Chip, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'

import AccessTimeIcon from '@mui/icons-material/AccessTime';


const showTime = (time) => {

    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - (minutes * 60))

    if (seconds < 10) seconds = `0${seconds}`
    if (minutes < 10) minutes = `0${minutes}`
    return `${minutes}:${seconds}`
}

export default function AttemptHeader({ exam }) {

    const { assessment } = exam
    const theme = useTheme()

    return (
        <AppBar position="static" sx={{ mb: 2, bgcolor: theme.palette.background.alt }}>
            <Toolbar variant="dense" sx={{ justifyContent: "space-around" }}>

                <Box>
                    <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} sx={{ fontSize: { xs: 10, md: 14 } }}>
                        score : {assessment?.score || "0"} / {assessment?.total || "0"}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column' }}>

                    <Typography variant="h6" color="inherit" component="div" fontWeight={"600"}>
                        percentage
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} sx={{ fontSize: { xs: 10, md: 12 } }}>
                            {assessment?.percentage || "0"} %
                        </Typography>
                        <Chip label={assessment?.rating} size='small' color={assessment?.percentage >= 75 ? "success" : 'error'} sx={{ m: "0 5px", transition: "none" }} />
                    </Box>

                </Box>

                <Box display={"flex"}
                    justifyContent={"space-between"}
                    bgcolor={theme.palette.secondary[600]}
                    sx={{ transition: "all ease 2s" }}
                    borderRadius={"8px"}
                    p="10px"
                    width={"80px"}
                >
                    <AccessTimeIcon sx={{ m: "0 4px 0 0" }} />
                    <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} >
                        {showTime(Number(exam.tokenTime))}
                    </Typography>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
