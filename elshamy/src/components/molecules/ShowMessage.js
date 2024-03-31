import { Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { buttonError, sendSuccess } from '../styles/buttonsStyles'
import { useDeleteMessageMutation } from '../../toolkit/apiSlice'
import usePostData from '../../hooks/usePostData'
import ModalControlled from '../tools/ModalControlled'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../toolkit/messagesSlice'

function ShowMessage({ message, navigateFc }) {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { lang } = useSelector(s => s.global)



    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const [sendData] = useDeleteMessageMutation()
    const [deleteMessageFc] = usePostData(sendData, formOptions, setFormOptions)

    const deleteMessage = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await deleteMessageFc({ _id: message._id })
        dispatch(setMessages(null))

    }

    const openModal = () => {
        setFormOptions({
            ...formOptions, isShowModal: true
        })
    }
    return (
        <>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        subject:
                    </Typography>
                    <Typography variant="h5" component="div">
                        {message.subject}
                    </Typography>
                    <Typography color="text.secondary">
                        message:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2 }}>
                        {message.message}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        answer:
                    </Typography>
                    <Typography variant="body2" color={message.answer === "not" ? 'error' : "success"}>
                        {message.answer === "not" ? 'Not Answered yet' : message.anwser}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={navigateFc} disabled={formOptions.isLoading} sx={sendSuccess}>show</Button>
                    <Button onClick={openModal} disabled={formOptions.isLoading} sx={buttonError}>delete</Button>
                </CardActions>


            </Card>

            {formOptions.isShowModal && <ModalControlled
                title={lang.modal.delete} description="r u sure ?"
                action={deleteMessage}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </>

    )
}

export default ShowMessage
