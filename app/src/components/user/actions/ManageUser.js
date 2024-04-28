import { Alert, Box, Button, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetUser from '../GetUser'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
// import UserProfile from '../../../pages/UserProfile';
import ModalControlled from '../../tools/ModalControlled';
import usePostData from '../../../hooks/usePostData';
import { useDispatch, useSelector } from 'react-redux';
import { delteUser, updateUserState } from '../../../toolkit/usersSlice';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import Loader from '../../tools/Loader';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../toolkit/apis/UsersApi';


export default function ManageUser({ user, setUser }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme()
    const [isShow, setShow] = useState(true)
    const { lang } = useSelector(s => s.global)

    const [settings, setSettings] = useState({
        isShowModal: false,
        title: "",
        description: "",
        isLoading: false,
        doneMessage: "",
        isDone: "",
        action: null,
        values: null
    })

    const [deleteData] = useDeleteUserMutation()
    const [sendDelete] = usePostData(deleteData, settings, setSettings)

    const [update] = useUpdateUserMutation()
    const [sendUpdate] = usePostData(update, settings, setSettings)

    const [actionType, setAction] = useState()

    const showModal = (typeFc, values, title, description) => {
        setAction(typeFc)
        setSettings({
            ...settings, isShowModal: true, values, title, description,
        })
    }

    const trigger = async () => {
        try {
            setShow(false)
            setSettings({
                ...settings, isLoading: true, isShowModal: false
            })
            if (actionType === 'delete') {
                await sendDelete(settings.values)
                dispatch(delteUser(user))
                setUser(null)
            } else {
                const res = await sendUpdate(settings.values)
                console.log(res)
                setUser(res)
            }

        } catch (error) {
            setSettings({
                isDone: true, isError: true, doneMessage: lang.errors.connection
            })
        }
    }

    return (
        <Box>
            <Paper>
                <Grid container spacing={.5}
                    sx={{
                        backgroundColor: theme.palette.background.alt, m: "5px 0", p: "5px 15px 10px 15px",
                        borderRadius: "5px",
                    }}>

                    <Grid item xs={12} >
                        <Box display={"flex"} justifyContent={"center"}>
                            {isShow ? (
                                <Tooltip title="close">
                                    <IconButton sx={{ color: isShow ? theme.palette.error.main : theme.palette.success.main, }} onClick={() => setShow(!isShow)}>
                                        <VisibilitySharpIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : settings.isLoading ? (
                                <Loader />
                            ) : (
                                <Tooltip title="show" >
                                    <IconButton sx={{ color: isShow ? theme.palette.error.main : theme.palette.success.main, }} onClick={() => setShow(!isShow)}>
                                        <VisibilityOffSharpIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>

                    </Grid>

                    {isShow && (
                        <>
                            <Grid item xs={6}>
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: theme.palette.warning.main,
                                        color: theme.palette.grey[0],
                                        fontWeight: 500,
                                        "&:hover": {
                                            bgcolor: theme.palette.warning.dark
                                        }

                                    }}
                                    onClick={() => showModal(null, { _id: user._id, userName: user.userName, password: "reset" }, lang.modal.confirm, "if you clicked ok, u will not be able to back")}>
                                    {lang.users.resetPassword} <RestartAltIcon />
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                {!user.isAdmin && (
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.error.main,
                                            color: theme.palette.grey[0],
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: theme.palette.error.dark
                                            }
                                        }}
                                        onClick={() => showModal(null, { _id: user._id, userName: user.userName, isActive: user.isActive ? false : true }, lang.modal.confirm, "if you clicked ok, u will not be able to back")}>
                                        {user.isActive ? lang.users.inActivate : lang.users.activate}
                                    </Button>
                                )}
                            </Grid>

                            <Grid item xs={6}>
                                {!user.isAdmin && (
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.success.main,
                                            color: theme.palette.grey[0],
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: theme.palette.success.dark
                                            }
                                        }}
                                        onClick={() => showModal(null, { _id: user._id, userName: user.userName, role: user.role === "subAdmin" ? "student" : "subAdmin" }, lang.modal.confirm, "if you clicked ok, u will not be able to back")}>
                                        {user.role === "student" ? lang.users.makeSubAdmin : lang.users.makeStudent}  <SupervisorAccountIcon />
                                    </Button>
                                )}
                            </Grid>

                            <Grid item xs={6}>
                                {!user.isAdmin && (
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.error.light,
                                            color: theme.palette.grey[0],
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: theme.palette.error.dark
                                            }
                                        }}
                                        onClick={() => showModal("delete", user, lang.modal.delete, "if you clicked ok, u will not be able to back")}>
                                        {lang.users.removeUser} <DeleteIcon />
                                    </Button>
                                )}
                            </Grid>

                        </>
                    )}
                </Grid>
            </Paper>

            <ModalControlled
                title={settings.title}
                description={settings.description}
                action={trigger}
                isShowModal={settings.isShowModal}
                close={() => setSettings({ ...settings, isShowModal: false })} />

            {settings.isDone && (
                <Alert severity={settings.isError ? "error" : "success"}>{settings.doneMessage}</Alert>
            )}

        </Box>
    )
}
