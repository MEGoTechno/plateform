import { Avatar, Box, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/tools/Header'
import { user_roles } from '../components/constants/roles'
import AdminHome from '../components/home/AdminHome'
import UserHome from '../components/home/UserHome'


export default function HomePage() {

    const { user } = useSelector(s => s.global)

    if (user.role === user_roles.ADMIN) return (
        <Box>
            <Header title={"الصفحه الرئيسيه"} />
            <AdminHome />
        </Box>
    )

    return (
        <Box>
            <Header title={"الصفحه الرئيسيه"} />
            <UserHome />
        </Box>
    )
}
