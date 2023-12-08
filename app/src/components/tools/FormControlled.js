import { Alert, Box, Button, Modal, TextField, Typography, useTheme } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import ModalControlled from './ModalControlled'
import ButtonStyled from './ButtonStyled'
import { useSelector } from 'react-redux'

export default function FormControlled({ inputs, data, onSubmit, loading }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: theme.palette.background.alt,
        boxShadow: 24,
        p: 4,
        direction: lang.direction
    };
    const inputStyle = {
        margin: "10px 0", color: theme.palette.secondary[500], "&:focus": {
            color: theme.palette.secondary[500],
            backgroundColor: theme.palette.secondary[500],
        }
    }

    const buttonStyle = {
        fontWeight: 600,
        margin: "10px 0", color: theme.palette.primary[500], bgcolor: theme.palette.secondary[400],
        "&:hover": {
            bgcolor: theme.palette.secondary[500]
        }
    }

    // const [isOpen, setOpen] = useState(false); // for modal
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <Box display="flex" flexDirection="column" mt={"50px"}>
            <Formik initialValues={data} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                        {inputs && inputs.map(input => {
                            return (
                                <Field
                                    as={TextField}
                                    key={input.id}
                                    color='warning'
                                    id={input.id}
                                    name={input.value ? input.value : input.name}
                                    label={input.label}
                                    variant={input.varient ? input.variant : "outlined"}
                                    style={inputStyle}
                                    fullWidth
                                    required={input.required ? input.required : false}
                                    type={input.type ? input.type : "text"}
                                    disabled={input.disabled ? input.disabled : false}
                                    value={input.value && input.value} 
                                    hidden = {input.hidden && true}
                                    />
                            )
                        })}
                        <Button type='submit' fullWidth sx={buttonStyle} disabled={loading}>
                            {loading ? "..." : "send"}
                        </Button>
                    </Form>
                )}
            </Formik>
            {/* <ButtonStyled title="click" action={handleOpen} /> */}
            {/* {alert.alert && (
                <Alert severity='error'> {alert.message}</Alert>
            )} */}
        </Box >
    )
}
