import { Alert, Box, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

function MakeRadio({ inputName, input, props }) {

    return (
        <Box>
            <FormLabel >{input.label}</FormLabel>
            <Field as={RadioGroup}
                name={inputName}
            >
                {/* {!input.radios && <>add grade first</>} */}

                {input.options && input.options.map((option, i) => (
                    <FormControlLabel key={i} value={option.value} label={option.label} control={<Radio sx={{
                        " &.Mui-checked": {
                            color: "green"
                        }
                    }} />}
                    />
                ))}

                {(input.options?.length === 0 || !input.options) && (
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب اضافه سنه دراسيه</Alert>
                )}

                {props.errors[inputName] && props.touched[inputName] && (
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب الاختيار</Alert>
                )}
            </Field>
        </Box>
    )
}

export default MakeRadio
