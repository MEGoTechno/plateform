import { Alert, Avatar, Box, Button, Grid, Paper, TextField, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../toolkit/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../toolkit/globalSlice';
import Loader from '../tools/Loader';

export default function Login() {

    const { user } = useSelector(s => s.global)
    const { lang } = useSelector(s => s.global)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sendData] = useLoginMutation()
    const theme = useTheme()
    const paperStyle = { padding: 20, hegiht: "20vh", width: 250, margin: "20px auto" }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }
    const inputStyle = {
        margin: "10px 0", color: theme.palette.secondary[500], "&:focus": {
            color: theme.palette.secondary[500],
            backgroundColor: theme.palette.secondary[500],
        }
    }
    const buttonStyle = {
        fontWaight: "800",
        margin: "10px 0", backgroundColor: theme.palette.secondary[500], color: theme.palette.primary[500],
        "&:hover": {
            backgroundColor: theme.palette.secondary[600]
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const [data, setData] = useState({
        userName: "",
        password: '',
    })
    const handleData = (input) => {
        const { id, value } = input
        setData({
            ...data, [id]: value
        })
    }

    const [alert, setAlert] = useState({
        alert: false,
        message: ""
    })

    const [disable, setDisable] = useState(false)

    // log in fc
    const submit = () => {
        setDisable(true)
        setAlert({
            alert: false,
        })
        sendData(data).then((res) => {
            if (res.data) {
                setAlert({
                    alert: false,
                })
                setDisable(false)
                dispatch(setUser(res.data))
            } else {
                setAlert({
                    alert: "error",
                    message: res.error.data.message
                })
                setDisable(false)
            }
        }).catch(error => {
            setAlert({
                alert: "error",
                message: "something went wrong" + error
            })
            setDisable(false)
        })
    }


    return (
        <Box display="flex" justifyContent="center" mt={"50px"} >
            <Grid >
                <Paper elevation={10} style={paperStyle} >
                    <Grid align="center">
                        <Avatar sx={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h4>{lang.logo}</h4>
                    </Grid>
                    <TextField
                        color='warning'
                        id="userName"
                        label={lang.userName}
                        variant="outlined"
                        style={inputStyle}
                        fullWidth required type='text' onChange={(e) => handleData(e.target)} />
                    <TextField id="password" color='warning' label={lang.password} variant="outlined" style={inputStyle} fullWidth required type='password' onChange={(e) => handleData(e.target)} />
                    <Button type='submit' fullWidth sx={buttonStyle} onClick={() => { submit() }} disabled={disable}>
                        {disable ? <Loader /> : lang.send}
                    </Button>
                    {alert.alert && (
                        <Alert severity='error'> {alert.message}</Alert>
                    )}
                </Paper>
            </Grid>
        </Box>
    )
}
