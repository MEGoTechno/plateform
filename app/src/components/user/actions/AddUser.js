import React, { useState } from 'react'
import AddUserForm from './AddUserForm'
import { useAddUserMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { Avatar, Box, Grid, Paper, useTheme } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../../toolkit/usersSlice'
import Header from '../../tools/Header'

export default function Adduser() {

    const theme = useTheme()
    const {lang} = useSelector(s => s.global)
    const dispatch = useDispatch()
    const [formOptions, setFormOptions] = useState({ // if not modal use only 2 compose (default 3)
        isLoading: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "",
        values: null,
        getData: null
    })

    const [sendData] = useAddUserMutation()
    const [sendAdd] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isShowModal: false, isLoading: true
        })
        const res = await sendAdd()
        dispatch(addUser(res))
        console.log(res)
    }

    const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }
    return (

        <Box width="100%" sx={{direction: lang.direction}}>
            <Box display="flex" justifyContent="center" mt={"50px"} width="100%" >
                <Grid >
                    <Paper elevation={1} style={paperStyle} >
                        <Grid align="center">
                            <Avatar sx={avatarStyle}><PersonAddAltIcon /></Avatar>
                            <h4>{lang.logo}</h4>
                        </Grid>
                        <AddUserForm trigger={trigger} setFormOptions={setFormOptions} formOptions={formOptions} />
                    </Paper>
                </Grid>
            </Box>
        </Box>
    )
}
