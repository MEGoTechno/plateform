import { Box } from '@mui/material'
import React, { useState } from 'react'
import MessageForm from './MessageForm'
import Header from '../../tools/Header'
import { useCreateMessageMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../../toolkit/messagesSlice'
import { useNavigate } from 'react-router-dom'

export default function CreateMessage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const { user } = useSelector(s => s.global)
    const [sendData] = useCreateMessageMutation()
    const [createMessage] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        const res = await createMessage(formOptions.values)
        dispatch(setMessages(null))
        navigate("/messages")
    }

    const inputs = [
        {
            name: "id",
            label: "...",
            value: user._id,
            disabled: true,
            hidden: true
        },
        {
            name: "userName",
            label: "...",
            value: user.userName,
            disabled: true,
            hidden: true
        },
        {
            name: "subject",
            label: "subject",
        },
        {
            name: "message",
            label: "message",
            type: "textArea",
            rows: 10
        }
    ]

    return (
        <Box>
            <Header title={"send message"} />
            <MessageForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
