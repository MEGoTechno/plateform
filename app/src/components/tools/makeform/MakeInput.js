import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { ErrorMessage, Field, useFormik } from 'formik'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ShowFileSettings from './ShowFileSettings'
import { buttonStyle } from '../../styles/buttonsStyles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function MakeInput({ input, props }) {
    const fileRef = useRef(null)
    const inputValue = props.values[input.name]

    const { grades } = useSelector(s => s.global)
    if (input?.type === "radio") {
        return (
            <>
                <FormLabel >{input.label}</FormLabel>
                <Field as={RadioGroup}
                    name={input.name}
                >
                    {/* {!input.radios && <>add grade first</>} */}

                    {grades && grades.map((grade, i) => (
                        <FormControlLabel key={i} value={grade.gradeId} label={grade.gradeName} control={<Radio sx={{
                            " &.Mui-checked": {
                                color: "green"
                            }
                        }} />}
                        />
                    ))}

                    {(grades?.length === 0 || !grades) && (
                        <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب اضافه سنه دراسيه</Alert>
                    )}

                    {props.errors[input.name] && props.touched[input.name] && (
                        <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب الاختيار</Alert>
                    )}
                </Field>
            </>
        )
    }
    if (input?.type === "file") {

        const { value } = input
        return (
            <Box>
                <input
                    ref={fileRef}
                    type="file"
                    label="file"
                    hidden
                    name={input.name}
                    onChange={(e) => {
                        props.setFieldTouched(input.name, true)
                        props.setFieldValue(input.name, e.target.files[0])
                    }}
                />
                <Button sx={buttonStyle} style={{ width: "auto" }} onClick={() => fileRef.current.click()}>{input.label} <AddCircleOutlineIcon /> </Button>

                {props.errors[input.name] && props.touched[input.name] && (
                    <Alert sx={{ mb: "5px" }} severity='error'>{props.errors[input.name]}</Alert>
                )}

                {inputValue ? (
                    <ShowFileSettings file={inputValue} />
                ) : value && (
                    <ShowFileSettings file={value} />
                )}
            </Box>
        )
    }
    return (
        <Field
            as={TextField}
            sx={{
                m: "8px"
            }}
            name={input.name}
            type={input.type ? input.type : "text"}
            label={input.label}
            placeholder={input.placeholder && input.placeholder}
            color='warning'
            variant={input.variant ? input.variant : "outlined"}
            error={props.errors[input.name] && props.touched[input.name] ? true : false}
            helperText={< ErrorMessage name={input.name} />}
            fullWidth
            hidden={input.hidden && true}
            disabled={input.disabled ? true : false}
            defaultValue={input.defaultValue && input.defaultValue}
        />
    )
}



// const inputsSchema = [{
//     name: "firstname", ===> used as initialValue, validationSchema, input.name
//     label: "first Name",
//     type: "text",
//     errorMessage: "there is error",
// }]