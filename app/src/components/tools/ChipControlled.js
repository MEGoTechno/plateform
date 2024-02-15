import { Chip } from '@mui/material'
import React from 'react'

export default function ChipControlled({label}) {
    return (
        <Chip
            sx={{ width: "100%" }}
            label={label}
            variant={i === value ? "filled" : "outlined"}
            color='success'
        />
    )
}
