import { Button, useTheme } from '@mui/material'
import React from 'react'

export default function ButtonStyled({ title, action }) {
    const theme = useTheme()


    const buttonStyle = {
        fontWeight: 600,
        margin: "10px 0", color: theme.palette.primary[500], bgcolor: theme.palette.secondary[400],
        "&:hover": {
            bgcolor: theme.palette.secondary[500]
        }
    }


    return (
        <Button sx={buttonStyle} onClick={() => action()}>{title} </Button>
    )
}
