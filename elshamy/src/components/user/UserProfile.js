import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import UserHeader from '../molecules/UserHeader'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { buttonStyle } from '../styles/buttonsStyles'
import UserBody from '../molecules/UserBody'
import UserGroup from '../molecules/UserGroup'
import MakeTitle from '../tools/MakeTitle'
import UserPayments from '../molecules/UserPayments'
import { user_roles } from '../constants/roles'

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
            <UserHeader user={user}> <UpdateUserProfileBtn /></UserHeader>

            <UserBody user={user} />

            {user.role === user_roles.STUDENT && (
                <Box>
                    <Box m={"10px 0"}>
                        <UserGroup group={user.group} />
                    </Box>

                    <MakeTitle title={"payments"} />

                    <UserPayments user={user} isManage={false} />
                </Box>
            )}
        </Box>
    )
}
