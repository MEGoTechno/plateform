import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import UserHeader from '../molecules/UserHeader'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { buttonStyle } from '../styles/buttonsStyles'
import UserBody from '../molecules/UserBody'

export default function UserProfile({ user }) {
    const theme = useTheme()
    const navigate = useNavigate()

    const UpdateUserProfileBtn = () => {
        return <Button
            onClick={() => navigate("/profile/update", { state: { user } })}
            sx={buttonStyle} style={{ width: "auto" }}>
            update profile
        </Button>
    }

    return (
        <Box>
            <UserHeader> <UpdateUserProfileBtn /></UserHeader>

            <UserBody user={user} />
        </Box>
    )
}
