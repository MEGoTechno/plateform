import { Button, useTheme } from '@mui/material'
import React from 'react'

export default function ButtonStyled({ title, action, severity }) {
    const theme = useTheme()

    const modifybg = () => {
        if (severity === 'error') {
            return theme.palette.error.main
        } else {
            return theme.palette.secondary[400]
        }
    }
    const bgHover = () => {
        if (severity === 'error') {
            return theme.palette.error.light
        } else {
            return theme.palette.secondary[500]
        }
    }

    const buttonStyle = {
        fontWeight: 600,
        margin: "10px 0", color: theme.palette.primary[500], bgcolor: modifybg,
        "&:hover": {
            bgcolor: bgHover
        }
    }


    return (
        <Button sx={buttonStyle} onClick={action}>{title} </Button>
    )
}
