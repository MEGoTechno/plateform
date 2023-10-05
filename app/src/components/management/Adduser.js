import { Alert, Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, useTheme } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import React, { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAddUserMutation } from '../../toolkit/apiSlice';
import { useSelector } from 'react-redux';
import Loader from '../tools/Loader';

export default function AddUser() {

    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const [sendUser, { isLoading }] = useAddUserMutation()
    const fields = [{
        label: lang.users.name,
        id: "name"
    }, {
        label: lang.users.userName,
        id: "userName"

    }, {
        label: lang.users.email,
        id: "email"

    }, {
        label: lang.users.phone,
        id: "phone"

    }, {
        label: lang.users.familyPhone,
        id: "familyPhone"
    }, {
        label: lang.users.password,
        id: "password"
    }, {
        label: lang.users.grade,
        id: "grade"
    }]



    const newUser = {
        userName: "",
        name: "",
        password: '',
        email: "",
        phone: "",
        familyPhone: "",
        grade: ""
    }

    const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }
    const inputStyle = {
        margin: "10px 5px", color: theme.palette.secondary[500],
    }
    const buttonStyle = {
        fontWaight: "800",
        margin: "10px 0", backgroundColor: theme.palette.secondary[400], color: theme.palette.primary[500],
        "&:hover": {
            backgroundColor: theme.palette.secondary[300]
        }
    }
    const [alert, setAlert] = useState({
        alert: false,
        message: ""
    })
    const submitData = (values, props) => {
        setAlert({ alert: false })
        sendUser(values).then(res => {
            if (res.data) {
                setAlert({
                    alert: "success",
                    message: res.data.message
                })
                props.resetForm()
            } else {
                setAlert({
                    alert: "error",
                    message: res.error.data.message
                })
            }
        }).catch((err) => {
            setAlert({
                alert: "error",
                message: err.message
            })
        })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        userName: Yup.string().required("user name should be unique"),
        email: Yup.string().required(),
        phone: Yup.number("should be numbers").min(10, "invalid number"),
        familyPhone: Yup.number("should be numbers").min(10, "invaild number"),
        password: Yup.string().required("password is required").min(6, "should be at least 6 characters"),
        grade: Yup.string().required("required")
    })
    return (
        <Box width="100%">
            <Box display="flex" justifyContent="center" mt={"50px"} width="100%" >
                <Grid >
                    <Paper elevation={1} style={paperStyle} >
                        <Grid align="center">
                            <Avatar sx={avatarStyle}><PersonAddAltIcon /></Avatar>
                            <h4>MR Adel platform</h4>
                        </Grid>
                        <Formik initialValues={newUser} onSubmit={submitData} validationSchema={validationSchema} >
                            {(props) => (
                                <Form>
                                    {fields.map(field => {
                                        if (field.id === "grade") {
                                            return (
                                                <FormControl key={field.id}>
                                                    <FormLabel>{field.label}</FormLabel>
                                                    <Field as={RadioGroup} name='grade'
                                                    >
                                                        <FormControlLabel value="g1" label={lang.users.grade1} control={<Radio />} />
                                                        <FormControlLabel value="g2" label={lang.users.grade2} control={<Radio />} />
                                                        <FormControlLabel value="g3" label={lang.users.grade3} control={<Radio />} />
                                                    </Field>
                                                </FormControl>
                                            )
                                        }

                                        return (
                                            <Field
                                                as={TextField}
                                                key={field.id}
                                                color='warning'
                                                name={field.id}
                                                id={field.id}
                                                label={field.label}
                                                variant="outlined"
                                                style={inputStyle}
                                                fullWidth
                                                helperText={<ErrorMessage name={field.id} />}
                                                type={field.id === "password" ? "password" : "text"} />
                                        )
                                    })}
                                    <Button type='submit' fullWidth sx={buttonStyle} disabled={isLoading}>
                                        {isLoading ? <Loader /> : lang.send}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        {alert.alert && (
                            <Alert severity={alert.alert}>{alert.message}</Alert>
                        )}
                    </Paper>
                </Grid>
            </Box>
        </Box>
    )
}

// const [initialValues, setUser] = useState({
//     userName: "userName",
//     name: "",
//     password: '',
//     email: "",
//     familyPhone: ""
// })
// const handleUserName = (input) => {
//     const { id, value } = input
//     setUser({
//         ...initialValues, [id]: value
//     })
// }
// console.log(initialValues)

