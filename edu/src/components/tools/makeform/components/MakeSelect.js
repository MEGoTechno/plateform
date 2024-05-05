import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { memo, useState } from 'react'
import { hasError } from '../constants/hasError'
import { ErrorMessage, Field } from 'formik'

function MakeSelect({ props, inputName, input, value }) {

    const setValue = (e) => {
        props.setFieldValue(inputName, e.target.value)
    }

    return (
        <FormControl fullWidth error={hasError(props, inputName) ? true : false} color='warning'>
            <InputLabel id="demo-simple-select-label">{input.label}</InputLabel>
            <Field
                as={Select}
                name={inputName}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value === 0 ? 0 : value || ""}
                label={input.label}
                onChange={setValue}
            >
                {input.options && input.options.map((option, i) => {
                    if (option.label) {
                        return (
                            <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                        )
                    }
                    return false
                })}

            </Field>
            <FormHelperText>
                <ErrorMessage name={inputName} />
            </FormHelperText>
        </FormControl>
    )
}

export default memo(MakeSelect)
