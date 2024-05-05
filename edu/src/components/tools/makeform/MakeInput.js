import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ErrorMessage, FastField, Field } from 'formik'
import React from 'react'

import MakeFieldArray from './MakeFieldArray'
import MakeRadio from './components/MakeRadio'
import MakeFile from './components/MakeFile'

import { getValues } from './constants/getValue'
import { getInputName } from './constants/getInputName'
import MakeTitle from './components/MakeTitle'
import { hasError } from './constants/hasError'
import MakeChunk from './MakeChunk'
import MakeSelect from './components/MakeSelect'
import MakeSelectRef from './components/MakeSelectRef'
import MakeChoosed from './components/MakeChoosed'
import MakeFullDate from './components/MakeFullDate'

export default function MakeInput({ input, props, nestedInputName, style }) {
    //nestedInputName in case used by field array

    const inputName = getInputName(nestedInputName, input)
    const value = getValues(inputName, props)

    if (input.type === "chunk") {
        return <MakeChunk inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "header") {
        return <Box>
            <MakeTitle title={input.title} />
        </Box>
    }

    if (input?.type === "array") {
        return <MakeFieldArray inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "radio") {
        return (
            <Box>
                <MakeRadio inputName={inputName} input={input} props={props} />
            </Box>
        )
    }

    if (input?.type === "file") {
        return (
            <Box>
                <MakeFile inputName={inputName} input={input} props={props} value={value} />
            </Box>
        )
    }

    if (input.type === 'fullDate') {
        return <Box m={"10px 0"}>
            <MakeFullDate inputName={inputName} props={props} value={value} input={input} />
        </Box>
    }

    if (input.type === "select") {

        return (
            <MakeSelect props={props} inputName={inputName} input={input} value={value} />
        )
    }

    if (input.type === "choosed") {

        return (
            <MakeChoosed props={props} inputName={inputName} input={input} value={value} />
        )
    }

    if (input.type === "selectRef") {
        return <MakeSelectRef inputName={inputName} input={input} props={props} value={value} />
    }

    return (
        <FastField
            as={TextField}
            sx={{
                m: "6px 0",
                display: input.hidden && "none",
            }}

            style={style}

            name={inputName}
            type={input.type ? input.type : "text"}
            label={input.label}
            placeholder={input.placeholder && input.placeholder}
            variant={input.variant ? input.variant : "outlined"}

            color='warning'
            error={hasError(props, inputName) ? true : false}
            helperText={< ErrorMessage name={inputName} />}
            fullWidth

            disabled={input.disabled ? true : false}
            hidden={input.hidden && true}
            defaultValue={input.defaultValue && input.defaultValue}

            multiline={input.rows && true}
            rows={
                input.rows || undefined
            }

            InputProps={input.icon && {
                startAdornment: (
                    <InputAdornment position="start">
                        {input.icon}
                    </InputAdornment>
                ),
            }}
        />
    )
}