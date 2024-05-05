import React from 'react'
import Header from '../tools/Header'
import { Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, Typography, useTheme } from '@mui/material'
import ShowMessage from '../molecules/ShowMessage'
import { useNavigate } from 'react-router-dom'

export default function ShowMessages({ messages }) {
    const theme = useTheme()
    const navigate = useNavigate()


    return (
        <Grid container spacing={2}>
            {messages && messages.map((message, i) => {
                const navigateFc = () => {
                    navigate("/messages/" + message._id, {state: message})
                }
                return (
                    <Grid item sm={12} md={6} key={i} width={"100%"}>
                        <ShowMessage navigateFc={navigateFc} message={message} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
