import { Avatar, Box, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/tools/Header'

export default function HomeProfile() {
    const theme = useTheme()
    let { user, lang } = useSelector(s => s.global)
    if (user) {
        return (
            <Box>
                <Header title={lang.links.userProfile} sx={{
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
                        <Box>
                            <Typography variant='h4' fontWeight="600" color={theme.palette.primary[100]}>
                                {user.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' fontWeight="600" color={theme.palette.neutral.main} sx={{
                                opacity: ".7"
                            }}>
                                {user.isAdmin ? "admin" : "student"}
                            </Typography>
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
    }
}
