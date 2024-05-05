import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

import GroupWorkIcon from '@mui/icons-material/GroupWork';
import Groups3Icon from '@mui/icons-material/Groups3';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { user_roles } from '../constants/roles';

function UserBody({ user }) {
    const theme = useTheme()

    return (
        <Paper sx={{ display: "flex", justifyContent: "space-between", flexWrap: 'wrap', mt: "10px", p: '10px', borderRadius: 6, bgcolor: theme.palette.background.alt }}>

            <Stack alignItems={"center"}>
                <Typography variant='h5' fontWeight={600}>grade <GroupWorkIcon sx={{ m: '0 2px' }} color='warning' /> </Typography>
                <Typography variant='h6' sx={{ opacity: .8 }}>{user.role === user_roles.STUDENT ? user.grade.gradeName : user.role}</Typography>
            </Stack>

            <Stack alignItems={"center"}>
                <Typography variant='h5' fontWeight={600}>group  <Groups3Icon sx={{ m: '0 2px' }} color='warning' /> </Typography>
                <Typography variant='h6' sx={{ opacity: .8 }}>{user.role === user_roles.STUDENT ? user.group.groupName : user.role}</Typography>
            </Stack>

            <Stack alignItems={"center"}>
                <Typography variant='h5' fontWeight={600}>userName <PersonPinIcon sx={{ m: '0 2px' }} color='warning' /> </Typography>
                <Typography variant='h6' sx={{ opacity: .8 }}>{user.userName}</Typography>
            </Stack>

        </Paper>
    )
}

export default UserBody
