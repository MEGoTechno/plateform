import React, { useEffect } from 'react'
import GetUser from '../../components/user/GetUser'
import { useDispatch, useSelector } from 'react-redux'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetUsersQuery } from '../../toolkit/apiSlice'
import { setUsers } from '../../toolkit/usersSlice'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { Box, Button } from '@mui/material'
import Header from '../../components/tools/Header'
import { useNavigate } from 'react-router-dom'
import { buttonStyle } from '../../components/styles/buttonsStyles'
import MakeTitle from '../../components/tools/MakeTitle'
import ManageGetUser from '../../components/user/ManageGetUser'
import useGetGrades from '../../hooks/useGetGrades'

export default function ManageGetUSerPage() {
    const { users } = useSelector(s => s.usersSettings)
    const { lang, user } = useSelector(s => s.global)
    const [getGrades, grades] = useGetGrades()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [getData, { isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const trigger = async () => {
        try {
            if (!grades && user.isAdmin) {
                await getGrades()
            }
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


    if (isLoading && !users) {
        return <LoaderSkeleton />
    }

    if (!users || users?.length === 0) {
        return <>add user</>
    }

    return (
        <Box>
            <Header title={lang.links.manageUsers} />
            {users?.length !== 0 && (
                <ManageGetUser users={users} />
            )}
        </Box>
    )
}
