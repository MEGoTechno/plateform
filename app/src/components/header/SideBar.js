import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Button, IconButton, Typography, useTheme } from '@mui/material';
import { navLinks } from './navLinks';
import { FlexInBetween } from '../tools/FlexInBetween';
import ClearIcon from '@mui/icons-material/Clear';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../toolkit/globalSlice';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { buttonStyle } from '../styles/buttonsStyles';

export default function SideBar({ isOpenedSideBar, setSideBar, isNonMobile, sideBarWidth }) {

    const theme = useTheme()
    const { user } = useSelector(state => state.global)
    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const [activeLink, setActiveLink] = useState()

    useEffect(() => {
        if (pathname) {
            const link = pathname.split("/")
            if (link[1] === "management") {
                setActiveLink(`/${link[1]}/${link[2]}`)
            } else {
                setActiveLink(`/${link[1]}`)
            }
        }
    }, [pathname])

    return (
        <Box component="nav" sx={{ transition: ".3s all ease" }}>

            <Drawer
                variant={isNonMobile ? 'persistent' : "temporary"}
                anchor='left'
                open={isOpenedSideBar}
                onClose={() => setSideBar(false)}
                sx={{
                    width: sideBarWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSixing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: sideBarWidth,
                    },
                }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexInBetween color={theme.palette.secondary.main} sx={{ display: "flex", justifyContent: "space-between" }}>
                            {/* <Box gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold">
                                    DASHBOARD
                                </Typography>
                            </Box> */}

                            <Box sx={{
                                ml: "-20px",
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                <Avatar alt={user.name} src="/static/images/avatar/1.jpg" sx={{
                                    mr: 2,
                                    height: "60px",
                                    width: "60px",
                                    bgcolor: theme.palette.secondary[400]
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
                                            {user.role}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setSideBar(!isOpenedSideBar)}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </FlexInBetween>
                    </Box>
                    <List>
                        {navLinks.map((link, i) => {
                            if (!link.icon && user.role !== "student") {
                                return (
                                    <Box key={i} sx={{ display: "flex", justifyContent: "center", }}>
                                        <Typography variant='h6' sx={{ mt: "2.25rem", mb: "1rem", opacity: ".8" }}>
                                            {link.name}
                                        </Typography>
                                    </Box>
                                )
                            }

                            if (link.isAdmin && user.role !== "student") {
                                return (
                                    <ListItem key={i} sx={{ p: "0 10px" }}>
                                        <ListItemButton onClick={() => {
                                            navigate(link.to)
                                            setActiveLink(link.to)
                                        }}
                                            sx={{
                                                backgroundColor:
                                                    activeLink === link.to
                                                        ? theme.palette.secondary[400]
                                                        : "transparent",
                                                color:
                                                    activeLink === link.to
                                                        ? theme.palette.primary[500]
                                                        : theme.palette.secondary[100],
                                                "&:hover": {
                                                    backgroundColor: theme.palette.secondary[500],
                                                    color: theme.palette.primary[600],
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                ml: "2rem",
                                                color: "inherit"
                                            }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                            <ChevronRightOutlinedIcon sx={{
                                                ml: "auto",
                                                display: activeLink === link.to ? "block" : "none",
                                            }} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }

                            if (!link.icon || link.isAdmin) {
                                return (
                                    <React.Fragment key={i}>
                                    </React.Fragment>
                                )
                            }

                            return (
                                <ListItem key={i} sx={{ p: "0 10px" }}>
                                    <ListItemButton onClick={() => {
                                        navigate(link.to)
                                        setActiveLink(link.to)
                                    }}
                                        sx={{
                                            backgroundColor:
                                                activeLink === link.to
                                                    ? theme.palette.secondary[400]
                                                    : "transparent",
                                            color:
                                                activeLink === link.to
                                                    ? theme.palette.primary[500]
                                                    : theme.palette.secondary[100],
                                            "&:hover": {
                                                backgroundColor: theme.palette.secondary[500],
                                                color: theme.palette.primary[600],
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            ml: "2rem",
                                            color: "inherit"
                                        }}>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} />
                                        <ChevronRightOutlinedIcon sx={{
                                            ml: "auto",
                                            display: activeLink === link.to ? "block" : "none",
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
                <Box height="100%" display="flex" alignItems="end" >
                    <Button sx={{
                        width: '100%',
                        m: '0 5px 15px 5px',
                        color: "inherit",
                        bgcolor: theme.palette.error.dark,
                        "&:hover": {
                            bgcolor: theme.palette.error.dark,
                        }
                    }} onClick={() => dispatch(logout())}>
                        <LogoutIcon />    {lang.links.logOut}
                    </Button>
                </Box>
            </Drawer >
        </Box >
    );
}