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
import { ErrorBtn, buttonError, buttonStyle } from '../../styles/buttonsStyles';
import ModalControlled from '../tools/ModalControlled';
import { user_roles } from '../constants/roles';


export default function SideBar({ isOpenedSideBar, setSideBar, isNonMobile, sideBarWidth }) {

    const theme = useTheme()
    const [isShowModal, setShowModal] = useState(false)
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

    const userLogout = () => {
        dispatch(logout())
        setShowModal(false)
    }

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
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.alt,
                        boxSixing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: sideBarWidth,
                    },
                }}
            >

                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexInBetween sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{
                                    ml: "-20px",
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Avatar alt={user.name} src={user?.avatar?.url || "#"}
                                        sx={{
                                            objectFit: 'contain',
                                            mr: 2,
                                            height: "60px",
                                            width: "60px",
                                            bgcolor: theme.palette.secondary.main
                                        }} />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: "column"
                                    }}>
                                        <Box>
                                            <Typography variant='h4' fontWeight="600" color={theme.palette.text.primary}>
                                                {user.name}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h6' fontWeight="600" color={theme.palette.text.secondary} sx={{
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

                                if (!link.icon && link.allowedTo.includes(user.role)) {
                                    return (
                                        <Box key={i} sx={{ display: "flex", justifyContent: "center", }}>
                                            <Typography variant='h6' sx={{ mt: "2.25rem", mb: "1rem", opacity: ".8" }}>
                                                {link.name}
                                            </Typography>
                                        </Box>
                                    )
                                }

                                if (link?.allowedTo?.includes(user.role)) {
                                    return (
                                        <ListItem key={i} sx={{ p: "0 10px" }}>
                                            <ListItemButton onClick={() => {
                                                navigate(link.to)
                                                setActiveLink(link.to)
                                            }}
                                                sx={{
                                                    backgroundColor:
                                                        activeLink === link.to
                                                            ? theme.palette.secondary.main
                                                            : "transparent",
                                                    color:
                                                        activeLink === link.to
                                                            ? theme.palette.text.active
                                                            : theme.palette.text.primary,
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.secondary[500],
                                                        color: theme.palette.text.hover,
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
                                return false
                            })}
                        </List>
                    </Box>
                    <Box display="flex" alignItems="end" >

                        <ErrorBtn sx={{ mx: "10px" }} onClick={() => setShowModal(true)}>
                            <LogoutIcon />    {lang.links.logOut}
                        </ErrorBtn>

                    </Box>
            </Drawer >

            <ModalControlled
                title={lang.modal.logOut}
                description={"dsd"}
                action={userLogout}
                isShowModal={isShowModal}
                close={() => setShowModal(false)} />
        </Box >
    );
}