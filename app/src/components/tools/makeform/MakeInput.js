import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { ErrorMessage, Field, useFormik } from 'formik'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

export default function MakeInput({ input, props }) {
    const fileRef = useRef(null)

    const { grades } = useSelector(s => s.global)
    if (input?.type === "radio") {
        // console.log(input.name.{input.radioKeys[0]})
        return (
            <>
                <FormLabel>{input.label}</FormLabel>
                <Field as={RadioGroup}
                    name={input.name}
                >
                    {/* {!input.radios && <>add grade first</>} */}

                    {grades && grades.map((grade, i) => (
                        <FormControlLabel key={i} value={grade.gradeId} label={grade.gradeName} control={<Radio />} />
                    ))}
                </Field>
            </>
        )
    }
    if (input?.type === "file") {
        return (
            <>
                <input
                    ref={fileRef}
                    type="file"
                    label="file"
                    hidden
                    onChange={(e) => {
                        console.log(e.target.files[0])
                        props.setFieldValue(input.name, e.target.files[0])
                    }}
                />
                <Button onClick={() => fileRef.current.click()}>{input.label}</Button>
            </>
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