import { Box } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import Adduser from './AddUser'
import useGetGrades from '../../../hooks/useGetGrades'
import { useDispatch, useSelector } from 'react-redux'
import LoaderSkeleton from '../../tools/LoaderSkeleton'
import { useLazyGetGroupsQuery } from '../../../toolkit/apiSlice'
import useLazyGetData from '../../../hooks/useLazyGetData'
import Header from '../../tools/Header'
import { setGroups } from '../../../toolkit/groupsSlice'
import { useLocation } from 'react-router-dom'

export default function AddUserPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const { lang } = useSelector(s => s.global)
  const [getGrades] = useGetGrades()

  const { grades, groups } = useSelector(s => s.groupsState)

  const [getData] = useLazyGetGroupsQuery()
  const [getGroups] = useLazyGetData(getData)

  const trigger = async () => {
    const groups = await getGroups()
    dispatch(setGroups(groups))
  }

  useEffect(() => {
    if (!grades) {
      getGrades()
    }

    if (!groups) {
      trigger()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grades, groups])


  if (!grades || !groups) return <LoaderSkeleton />


  return (
    <Box>
      {location.pathname === "/management/user/add" && (
        <Header title={lang.users.addUser} />
      )}
      <Adduser groups={groups} grades={grades} />
    </Box>
  )
}
