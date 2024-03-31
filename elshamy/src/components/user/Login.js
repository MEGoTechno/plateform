import { Avatar, Box, Grid, Paper, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from './actions/LoginForm';
import * as Yup from "yup"

export default function Login({ lang }) {

    const inputs = [{
        name: "userName",
        label: "user name",
        validation: Yup.string().required()
    },
    {
        name: "password",
        label: "password",
        type: 'password',
        validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")
    }]
    const theme = useTheme()
    const paperStyle = { padding: 20, hegiht: "20vh", width: 250, margin: "20px auto" }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }

    return (
        <Box display="flex" justifyContent="center" mt={"50px"} zIndex="1">
            <Grid>
                <Grid >
                    <Paper elevation={10} style={paperStyle} >
                        <Grid align="center">
                            <Avatar sx={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h4>{lang.logo}</h4>
                        </Grid>
                        <LoginForm inputs={inputs} />
                    </Paper>
                </Grid>
            </Grid>
        </Box >


    )
}
