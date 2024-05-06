import React from 'react'
import { FlexInBetween } from '../tools/FlexInBetween'
import { AppBar, Avatar, Badge, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../toolkit/globalSlice';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useNavigate } from 'react-router-dom';
import { user_roles } from '../constants/roles';

export default function Navbar({ setSideBar, isOpenedSideBar }) {


    const { lang, user } = useSelector(s => s.global)
    const navigate = useNavigate()
    const theme = useTheme()
    const dispatch = useDispatch()
    return (
        <AppBar sx={{
            position: "static",
            background: "none"
        }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* left side */}
                <FlexInBetween>
                    <IconButton onClick={() => setSideBar(!isOpenedSideBar)} sx={{ mr: 1 }}>
                        <MenuIcon />
                    </IconButton>
                    <Avatar src="/images/logo.webp" sx={{
                        mr: 2,
                        height: "30px",
                        width: "30px",
                        bgcolor: theme.palette.secondary[400]
                    }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 600,
                            letterSpacing: '.01rem',
                            color: theme.palette.neutral[0],
                            textDecoration: 'none',
                        }}
                    >
                        {lang.logo}
                    </Typography>
                </FlexInBetween>

                <FlexInBetween gab="1.5rem">
                    <Tooltip title="السمه">
                        <IconButton onClick={() => dispatch(setMode())} sx={{ mr: 1 }}>
                            {theme.palette.mode === "dark" ? (<NightsStayOutlinedIcon sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightModeOutlinedIcon sx={{ fontSize: '25px' }} />)}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="الاشعارات">
                        <IconButton onClick={() => user.role === user_roles.ADMIN ? navigate("/management/messages") : navigate("/messages")}>
                            <Badge color="secondary" variant="dot">
                                <EmailIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="profile">
                        <IconButton onClick={() => navigate("/profile")}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
                </FlexInBetween>
            </Toolbar>
        </AppBar>
    )
}
