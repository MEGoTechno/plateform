import { Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function Not() {
    const theme = useTheme()
  return (
    <Paper elevation={3} sx={{
        backgroundColor: theme.palette.primary[600],
        p: 2,
        mt: 2
    }}>
        <Typography>page is underconstruction !</Typography>
    </Paper>
  )
}
