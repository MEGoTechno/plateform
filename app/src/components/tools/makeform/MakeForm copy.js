import React, { useState } from 'react'
import MakeInput from './MakeInput'
import { Form, Formik, useFormik } from 'formik'
import * as Yup from "yup"
import { Alert, Box } from '@mui/material'

export default function MakeForm({ inputs, onSubmit, formOptions }) {
    const data = {}
    const validation = {}

    inputs.forEach(element => {
        data[element.name] = element.value || ""

        if (element.validation) {
            validation[element.name] = element.validation
        }
    });

    const validationSchema = Yup.object().shape(validation)


    return (
        <Box>
            <Formik initialValues={data} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        {inputs && inputs.map((input, i) => (
                            <MakeInput key={i} input={input} props={props} />
                        ))}
                        <button type='submit' >
                            {formOptions?.isLoading ? "sending ..." : "submit"}
                        </button>
                    </Form>
                )}
            </Formik>
            {formOptions?.isDone &&
                <Alert severity={formOptions?.isError ? "error" : "success"}>{formOptions?.doneMessage}</Alert>
            }
        </Box>
    )
}