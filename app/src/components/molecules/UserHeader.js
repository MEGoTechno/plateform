import { Avatar, Box, Button, Typography, useTheme } from '@mui/material'
import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

export default function UserHeader(props) {
    const [isNonMobile] = useOutletContext()

    const { children } = props
    const { user } = useSelector(s => s.global)
    const theme = useTheme()
    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: isNonMobile ? "row" : "column"
        }}>
            <Avatar alt={user.name.toUpperCase()} src={user?.avatar?.url || "#"}
                sx={{
                    m: '6px',
                    height: "60px",
                    width: "60px",
                    bgcolor: theme.palette.secondary[400],
                    fontWeight: 800
                }}
                variant='rounded' />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: !isNonMobile && "center",
                flexDirection: "column"
            }}>
                <Box>
                    <Typography variant='h5' fontWeight="600" color={theme.palette.primary[100]}>
                        {user.name}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h6' fontWeight="600" color={theme.palette.neutral.main} sx={{
                        opacity: ".9"
                    }}>
                        {user.role}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
                {children}
            </Box>
        </Box>
    )
}
