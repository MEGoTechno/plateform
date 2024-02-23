import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'
// import Header from "../components/header/Header"
import SideBar from '../components/header/SideBar'
import Navbar from '../components/header/Navbar'
import { useSelector } from 'react-redux'
import GlobalMsg from '../components/tools/GlobalMsg'
import useAuth from '../middleware/useAuth'
import LoginPage from './client/LoginPage'
import NotFound from '../components/tools/NotFound'

export default function Layout() {
    const [authorize, isAccessed] = useAuth()
    const navigate = useNavigate()
    const [isOpenedSideBar, setSideBar] = useState(false)
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { user } = useSelector(s => s.global)


    useEffect(() => {
        isNonMobile ? setSideBar(true) : setSideBar(false)
        authorize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNonMobile, navigate, user])

    const sideBarWidth = "250px"

    return (
        <Box width="100%" height="100%">

            {user ? (
                <>
                    <SideBar isOpenedSideBar={isOpenedSideBar} setSideBar={setSideBar} isNonMobile={isNonMobile} sideBarWidth={sideBarWidth} />
                    <Box
                        sx={{
                            width: isOpenedSideBar && isNonMobile ? `calc(100% - ${sideBarWidth})` : "100%",
                            ml: "auto",
                            transition: ".3s all ease"
                        }}>
                        <Navbar setSideBar={setSideBar} isOpenedSideBar={isOpenedSideBar} />
                        <Box sx={{ p: "0 32px" }}>
                            {isAccessed ? <Outlet context={[isNonMobile]} /> : <NotFound />}
                        </Box>
                    </Box>
                </>

            ) : (
                <LoginPage />
            )}
            <GlobalMsg />
        </Box>
    )
} 
