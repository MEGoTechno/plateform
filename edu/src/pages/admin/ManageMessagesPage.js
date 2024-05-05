import React, { useEffect } from 'react'
import { useLazyGetMessagesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../toolkit/messagesSlice'
import { Box } from '@mui/material'
import Header from '../../components/tools/Header'
import ManageMessages from '../../components/messages/ManageMessages'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'

export default function ManageMessagesPage() {
  const dispatch = useDispatch()

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

  if (!messages) return <LoaderSkeleton />

  return (
    <Box>
      <Header title={"Manage messages"} />
      <ManageMessages messages={messages} />
    </Box>
  )
}
