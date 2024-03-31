import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsers } from '../toolkit/usersSlice'
import { useLazyGetUsersQuery } from '../toolkit/apiSlice'
import useLazyGetData from './useLazyGetData'

export default function useGetUsers(setPageState, paginationModel) {

    const [getData, { data, isSuccess, isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const getUser = async (grade, userRole) => {

        setPageState(pre => { return { ...pre, isLoading: true } })


        const limit = paginationModel.pageSize
        const page = paginationModel.page + 1

        const gradeId = grade || "All"
        const role = userRole || "All"

        const res = await getUsers({ page, limit, gradeId, role })

        setPageState({ rowCount: res.count, isLoading: false })

        return res.users
    }

    return [getUser]
}
