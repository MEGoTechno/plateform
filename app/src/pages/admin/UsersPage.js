import React from 'react'
import GetUsers from '../../components/management/GetUsers';
import { Box } from '@mui/material';
import Header from '../../components/tools/Header';
import { useSelector } from 'react-redux';

export default function UsersPage() {
    const {lang} = useSelector(s => s.global)
    return (
        <Box>
            <Header title= {lang.links.users} />
            <GetUsers />
        </Box >
    )
}
