import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetMessagesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import Header from '../../components/tools/Header'
import ShowMessages from '../../components/messages/ShowMessages'
import { setMessages } from '../../toolkit/messagesSlice'
import Messages from '../../components/messages/UserMessages'

export default function MessagesPage() {
    const dispatch = useDispatch()

    const { user } = useSelector(s => s.global)
    const { messages } = useSelector(s => s.messagesState)
    const [getData] = useLazyGetMessagesQuery()
    const [getMessages] = useLazyGetData(getData, messages)

    const trigger = async () => {
        const res = await getMessages()
        dispatch(setMessages(res))
    }

    useEffect(() => {
        if (!messages) {
            trigger()
        }
    }, [messages])

    return (
        <div>
            <Header title={"messages"} />
            <Messages messages={messages} />
        </div>
    )
}
