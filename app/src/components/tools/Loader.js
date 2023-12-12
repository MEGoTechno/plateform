import { Box, CircularProgress, useTheme } from '@mui/material'
import React from 'react'

export default function Loader() {
    const theme = useTheme()

    return (

        <CircularProgress size={"25px"} thickness={8} sx={{ color: theme.palette.secondary[500] }} />
    )
}
