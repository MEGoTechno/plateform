import { Alert, Box, Button, Stack } from '@mui/material'
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

export default function ManageUser({ user, setUser }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            console.log(error)
            setSettings({
                isDone: true, isError: true, doneMessage: "connection confused"
            })
        }
    }

    return (
        <div>
            <Stack direction={"column"}>

                <Button onClick={() => navigate("/management/add-user")}>add user </Button>
                {!user.isAdmin && (
                    <Button color='error'
                        onClick={() => showModal("delete", user, "r u sure to delete this user", "if you clicked ok, u will not be able to back")}>
                        delete user
                    </Button>
                )}
                <Button color='warning'
                    onClick={() => showModal(null, { _id: user._id, userName: user.userName, password: true }, "r u sure to reset userPassword", "if you clicked ok, u will not be able to back")}>
                    reset  user password
                </Button>
                {!user.isAdmin && (
                    <Button color='error'
                        onClick={() => showModal(null, { _id: user._id, userName: user.userName, isActive: user.isActive ? false : true }, "r u sure to inActivate", "if you clicked ok, u will not be able to back")}>
                        {user.isActive ? "inactive this user" : "activate"}
                    </Button>
                )}

                {!user.isAdmin && (
                    <Button color='success'
                        onClick={() => showModal(null, { _id: user._id, userName: user.userName, role: user.role === "subAdmin" ? "student" : "subAdmin" }, "r u sure to make him admin", "if you clicked ok, u will not be able to back")}>
                        make him admin
                    </Button>
                )}

            </Stack>
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
