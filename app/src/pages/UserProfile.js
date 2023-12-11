import React from 'react'
import { useGetUsersQuery } from '../toolkit/apiSlice'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../components/tools/Header'
import { Avatar, Box, Divider, Paper, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'

export default function UserProfile({ user }) {
    const theme = useTheme()
    const location = useLocation()
    const { data: users, isSuccess, } = useGetUsersQuery()
    const { lang } = useSelector(s => s.global)
    const userId = location.pathname.split("/")[2]
    if (users && !user) {
        user = users.filter(obj => obj._id === userId)[0]
    }
    if (user) {
        return (
            <Box>
                <Header title={lang.links.UserProfile} sx={{
                    mt: 2
                }} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 2
                }}>
                    <Avatar alt={user.name} src="/static/images/avatar/1.jpg" sx={{
                        mr: 2,
                        height: "60px",
                        width: "60px"
                    }} />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: "column"
                    }}>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant='h4' fontWeight="600" color={theme.palette.primary[100]}>
                                {user.name}
                            </Typography>
                            <Typography color={user.isActive ? "blue" : "error"} ml={1}>
                                {user.isActive ? "(active)" : "(not active)"}
                            </Typography>
                        </Box>
                        <Box>
                            <Box variant='h6' fontWeight="600" color={theme.palette.neutral.main} sx={{
                                opacity: ".7", display: "flex",
                            }}>
                                <Box>
                                    {user.role} 
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Paper elevation={3} sx={{
                    backgroundColor: theme.palette.primary[600],
                    p: 2,
                    mt: 2
                }}>
                    <Typography>page is underconstruction !</Typography>
                </Paper>
            </Box>
        )
    } else {
        <Typography variant='h4' width="100%" textAlign="center">
            404 not found
        </Typography>
    }
}
