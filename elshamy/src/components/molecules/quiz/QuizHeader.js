import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ShowCountDown = (time) => {

  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time - (minutes * 60))

  if (seconds < 10) seconds = `0${seconds}`
  if (minutes < 10) minutes = `0${minutes}`
  return `${minutes}:${seconds}`
}

function QuizHeader({ exam, time, setTime, submit }) {

  const theme = useTheme()

  const timer = useRef()

  useEffect(() => {
    if (time > 0) {

      timer.current = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      // clearing interval
      return () => clearInterval(timer.current);

    } else {
      clearInterval(timer.current)
      submit()
    }
  }, [time]);

  // time - part name - lesson name 
  return (
    <AppBar position="static" sx={{ mb: 2, bgcolor: theme.palette.background.alt }}>
      <Toolbar variant="dense" sx={{ justifyContent: "space-around" }}>

        <Typography variant="h6" color="inherit" component="div" fontWeight={"600"}>
          {exam.partName}
        </Typography>

        <Typography variant="h6" color="inherit" component="div" fontWeight={"600"}>
          {exam.lessonName}
        </Typography>

        <Box display={"flex"}
          justifyContent={"space-between"}
          bgcolor={time > 60 ? theme.palette.secondary[600] : theme.palette.error.main}
          sx={{ transition: "all ease 2s" }}
          borderRadius={"8px"}
          p="10px"
          width={"80px"}
        >
          <AccessTimeIcon sx={{ m: "0 4px 0 0" }} />
          <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} >
            {ShowCountDown(time)}
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default QuizHeader
