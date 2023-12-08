import React, { useEffect } from 'react'
import GetUser from '../../components/user/GetUser'
import { useDispatch, useSelector } from 'react-redux'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetUsersQuery } from '../../toolkit/apiSlice'
import { setUsers } from '../../toolkit/usersSlice'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'

export default function ManageGetUser() {
    const { users } = useSelector(s => s.usersSettings)
    const dispatch = useDispatch()
    
    const [getData, { isLoading }] = useLazyGetUsersQuery()
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
        <div>
            {users?.length !== 0 ? (
                <GetUser users={users} />
            ) : (
                "no users found"
            )}
        </div>
    )
}
