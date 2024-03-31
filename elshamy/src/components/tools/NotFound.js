import { Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function NotFound() {
    const theme = useTheme()
  return (
    <Paper elevation={3} sx={{
        backgroundColor: theme.palette.primary[600],
        p: 2,
        mt: 2
    }}>
        <Typography>404; Not found</Typography>
    </Paper>
  )
}