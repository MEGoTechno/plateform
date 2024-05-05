import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../tools/Header'
import MessageForm from './MessageForm'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setMessages } from '../../../toolkit/messagesSlice'
import MessageDetails from '../../molecules/MessageDetails'
import NotFound from '../../tools/NotFound'
import { useUpdateMessageMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'

export default function AnswerPage() {

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

    const [sendData] = useUpdateMessageMutation()
    const [sendAnswer] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await sendAnswer(formOptions.values)
        dispatch(setMessages(null))
    }



    const inputs = [
        {
            name: "_id",
            value: message._id,
            disabled: true,
            hidden: true
        },
        {
            name: "answer",
            label: "answer",
            type: "textArea",
            rows: 10
        }
    ]

    if (!message) return <NotFound />

    return (
        <Box>
            <Header title={"answer"} />
            <Box m={"10px 0"}>
                <MessageDetails message={message} />
            </Box>
            <MessageForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
