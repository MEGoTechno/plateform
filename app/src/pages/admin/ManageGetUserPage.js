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

    const { lang } = useSelector(s => s.global)
    const [getGrades, grades] = useGetGrades()
    console.log(grades)

    const trigger = async () => {
        try {
            await getGrades()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!grades) {
            trigger()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grades])


    if (!grades) {
        return <LoaderSkeleton />
    }


    return (
        <Box>
            <Header title={lang.links.manageUsers} />
            <ManageGetUser />
        </Box>
    )
}
