import { Box, Divider, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../tools/Header'
import MessageForm from './MessageForm'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../../toolkit/messagesSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../../tools/NotFound'
import MessageDetails from '../../molecules/MessageDetails'

export default function UpdateMessage() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const location = useLocation()
    const message = location.state

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

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })

        dispatch(setMessages(null))
    }

    const inputs = [
        {
            name: "_id",
            label: "...",
            value: message?._id,
            disabled: true,
            hidden: true
        },
        {
            name: "subject",
            label: "subject",
            value: message?.subject
        },
        {
            name: "message",
            label: "message",
            type: "textArea",
            rows: 10,
            value: message?.message
        }
    ]

    if (!message) return <NotFound />
    return (
        <Box>
            <Header title={"send message"} />
            {message.answer !== "not" ? (
                <MessageDetails message={message} />
            ) : (
                <MessageForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
            )}

        </Box>
    )
}
