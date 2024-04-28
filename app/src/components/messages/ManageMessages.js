import { Alert, Box, Button, Grid, Switch, Typography, useTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import UserHeader from '../molecules/UserHeader';
import { getSameValue, getUnique } from '../tools/commonFC';
import { json, useNavigate } from 'react-router-dom';
import ShowMessages from './ShowMessages';
import ShowMessage from '../molecules/ShowMessage';
import { sendSuccess } from '../../styles/buttonsStyles';

export default function ManageMessages({ messages }) {

    const navigate = useNavigate()

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const theme = useTheme()

    const [isChecked, setChecked] = useState(true)

    const [users, setUsers] = useState(null)
    const [notAnswered, setNotAnswered] = useState(null)


    const getUsers = useCallback((messages) => {
        const preMessages = JSON.parse(JSON.stringify(messages))

        const users = getUnique(preMessages, "userName")

        const modified = users.map((user) => {
            const userMessages = messages.filter((message) => message.userName === user.userName)
            return { userName: user.userName, messages: userMessages }
        })

        setUsers(modified)
        console.log(messages)
    }, [users])

    const getNotAnsweredMessages = (messages) => {
        const preMessages = JSON.parse(JSON.stringify(messages))
        const notAnswered = preMessages.filter((message => message.answer === "not"))
        setNotAnswered(notAnswered)
        console.log("not ==>", notAnswered)
    }
    useEffect(() => {
        getNotAnsweredMessages(messages)
    }, [messages])

    return (
        <Box >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", bgcolor: theme.palette.background.alt }}>
                <Box width={"100px"} textAlign={"center"}>{isChecked ? "Users" : "Not answered"} :</Box>
                <Switch {...label} checked={isChecked} onChange={() => setChecked(!isChecked)} color='warning' />
            </Box>

            {isChecked ? (
                <Box>
                    {messages && messages?.map((message, i) => {

                        return (
                            <Box key={i}></Box>
                        )
                    })}
                </Box>
            ) : notAnswered && (
                <Box sx={{ m: '8px 0' }}>
                    {notAnswered?.length > 0 ?

                        <Grid container spacing={2}>
                            {messages && messages.map((message, i) => {

                                const navigateFc = () => {
                                    navigate("/management/messages/" + message._id, { state: message })
                                }

                                return (
                                    <Grid item sm={12} md={6} key={i} width={"100%"}>
                                        <Typography p={"6px 0"} m={"6px 0"} borderRadius={3}
                                            variant='h5'
                                            fontWeight={"bold"} textAlign={"center"} bgcolor={theme.palette.secondary[500]}>{message.userName}</Typography>
                                        <ShowMessage navigateFc={navigateFc} message={message} />
                                    </Grid>
                                )
                            })}
                        </Grid>

                        : <Alert severity='success'>all answered</Alert>}
                </Box>
            )}
            <Button onClick={() => getUsers(messages)}>click</Button>
        </Box>
    )
}
