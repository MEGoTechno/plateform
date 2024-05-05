import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SelectControlled({ value, handleChange, options, keys, title }) {


    const texts = {
        value: "value",
        label: 'label'
    }

    return (
        <FormControl fullWidth sx={{ m: '6px 0' }}>
            <InputLabel color='warning' id="demo-simple-select-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color='warning'
                value={value}
                label={title}
                onChange={handleChange}
            >
                {options && options.map((option, i) => {
                    return (
                        <MenuItem key={i} value={option[keys.value] || option}>{option[keys.label]}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default SelectControlled
