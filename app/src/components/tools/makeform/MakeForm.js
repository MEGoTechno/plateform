import React, { useState } from 'react'
import MakeInput from './MakeInput'
import { Form, Formik, useFormik } from 'formik'
import * as Yup from "yup"
import { Alert, Box, Button } from '@mui/material'
import Loader from "../../tools/Loader"
import { sendSuccess } from '../../styles/buttonsStyles'

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

                            
                        <Button
                            sx={sendSuccess}
                            type='submit'
                            disabled= {formOptions?.isLoading ? true: false}
                            >
                            {formOptions?.isLoading ? <Loader /> : "submit"}
                        </Button>
                    </Form>
                )}
            </Formik>
            {formOptions?.isDone &&
                <Alert severity={formOptions?.isError ? "error" : "success"}>{formOptions?.doneMessage}</Alert>
            }
        </Box>
    )
}