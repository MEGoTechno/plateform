import { Box, Button, Card, CardActions, CardContent, TextField, useTheme } from "@mui/material";
import { useState } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";

export default function Test() {

  const [value, setValue] = useState(null)
  const nowD = new Date()

  console.log("now ==>", typeof nowD)
  console.log("now ==>", nowD.getMinutes())
  if(value){
    console.log(typeof value)
    console.log(value.$d.getHours())
    console.log(value.$d.getMinutes())
  }
  // array of dayes sunday = 0
  return (
    <Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker value={value} onChange={(newValue)=> setValue(newValue)} label="Basic date picker" />
      </LocalizationProvider>
    </Box>
  )
}
