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
    const { users } = useSelector(s => s.usersSettings)
    const dispatch = useDispatch()

    const [getData, { data, isSuccess, isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)


    const trigger = async () => {
        try {
            const res = await getUsers()
            dispatch(setUsers(res))
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if (!users) {
            trigger()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <LoaderSkeleton />
    }

    return (
        <Box>
            <Header title={lang.links.users} />
            {users?.length !== 0 ? (
                <GetUsers users={users} />
            ) : (
                "no users found"
            )}
        </Box >
    )
}
