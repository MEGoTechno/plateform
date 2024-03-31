import React, { useEffect } from 'react'
import { Box } from '@mui/material';
import Header from '../../components/tools/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../toolkit/apiSlice';
import LoaderSkeleton from '../../components/tools/LoaderSkeleton';
import GetUsers from '../../components/user/GetUsers';
import useLazyGetData from '../../hooks/useLazyGetData';
import { setUsers } from '../../toolkit/usersSlice';

export default function UsersPage() {
    const { lang } = useSelector(s => s.global)
    const dispatch = useDispatch()


    return (
        <Box>
            <Header title={lang.links.users} />
            <GetUsers />
        </Box >
    )
}
