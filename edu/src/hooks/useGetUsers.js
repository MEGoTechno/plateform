import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsers } from '../toolkit/usersSlice'
import useLazyGetData from './useLazyGetData'
import { useLazyGetUsersQuery } from '../toolkit/apis/UsersApi'

export default function useGetUsers() {

    const [getData, { data, isSuccess, isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const getUser = async (setPageState, paginationModel, sort, filter) => {

        try {
            setPageState(pre => { return { ...pre, isLoading: true } })

            const limit = paginationModel.pageSize
            const page = paginationModel.page + 1

            const res = await getUsers({ page, limit, sort, filter })

            setPageState({ rowCount: res.count, isLoading: false })

            return res.users
            
        } catch (error) {
            console.log("err ==> ", error.message)
        }
    }

    return [getUser]
}
