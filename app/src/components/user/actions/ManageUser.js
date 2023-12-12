import { Alert, Box, Button, Grid, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetUser from '../GetUser'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import UserProfile from '../../../pages/UserProfile';
import ModalControlled from '../../tools/ModalControlled';
import usePostData from '../../../hooks/usePostData';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../toolkit/apiSlice';
import { useDispatch } from 'react-redux';
import { delteUser, updateUser } from '../../../toolkit/usersSlice';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import Loader from '../../tools/Loader';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ManageUser({ user, setUser }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme()
    const [isShow, setShow] = useState(true)


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
                setUser(res)
                dispatch(updateUser(res))
            }

        } catch (error) {
            setSettings({
                isDone: true, isError: true, doneMessage: "connection confused"
            })
        }
    }

    return (
        <div>

            <Grid container spacing={2}
                sx={{
                    backgroundColor: theme.palette.background.alt, m: "5px 0", p: "5px 5px 10px",
                    borderRadius: "5px",
                    justifyContent: "center",
                }}>

                <Grid item xs={12} width={"100%"}>
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
                                    color: theme.palette.grey[200],
                                    fontWeight: 500,
                                    "&:hover": {
                                        bgcolor: theme.palette.warning.dark
                                    }

                                }}
                                onClick={() => showModal(null, { _id: user._id, userName: user.userName, password: true }, "r u sure to reset userPassword", "if you clicked ok, u will not be able to back")}>
                                reset  user password <RestartAltIcon />
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            {!user.isAdmin && (
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: theme.palette.error.main,
                                        color: theme.palette.grey[200],
                                        fontWeight: 500,
                                        "&:hover": {
                                            bgcolor: theme.palette.error.dark
                                        }
                                    }}
                                    onClick={() => showModal(null, { _id: user._id, userName: user.userName, isActive: user.isActive ? false : true }, "r u sure to inActivate", "if you clicked ok, u will not be able to back")}>
                                    {user.isActive ? "inactive this user" : "activate"}
                                </Button>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            {!user.isAdmin && (
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: theme.palette.success.main,
                                        color: theme.palette.grey[200],
                                        fontWeight: 500,
                                        "&:hover": {
                                            bgcolor: theme.palette.success.dark
                                        }
                                    }}
                                    onClick={() => showModal(null, { _id: user._id, userName: user.userName, role: user.role === "subAdmin" ? "student" : "subAdmin" }, "r u sure to make him admin", "if you clicked ok, u will not be able to back")}>
                                    {user.role === "student" ? "make subAdmin" : "make student"}  <SupervisorAccountIcon />
                                </Button>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            {!user.isAdmin && (
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: theme.palette.error.light,
                                        color: theme.palette.grey[200],
                                        fontWeight: 500,
                                        "&:hover": {
                                            bgcolor: theme.palette.error.dark
                                        }
                                    }}
                                    onClick={() => showModal("delete", user, "r u sure to delete this user", "if you clicked ok, u will not be able to back")}>
                                    delete user <DeleteIcon />
                                </Button>
                            )}
                        </Grid>

                    </>
                )}
            </Grid>

            <Box>
                <UserProfile user={user} />
            </Box>

            <ModalControlled
                title={settings.title}
                description={settings.description}
                action={trigger}
                isShowModal={settings.isShowModal}
                close={() => setSettings({ ...settings, isShowModal: false })} />

            {settings.isDone && (
                <Alert severity={settings.isError ? "error" : "success"}>{settings.doneMessage}</Alert>
            )}

        </div>
    )
}
