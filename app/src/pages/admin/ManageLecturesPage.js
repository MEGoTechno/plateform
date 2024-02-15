import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageGrades from '../../components/content/manage/ManageGrades'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from "../../components/tools/LoaderSkeleton"
import { setLectures } from '../../toolkit/lecturesSlice'
import { Alert, Box, Button } from '@mui/material'
import useGetGrades from '../../hooks/useGetGrades'
import Header from '../../components/tools/Header'
import { buttonStyle } from '../../components/styles/buttonsStyles'
import { useNavigate } from 'react-router-dom'
import ManageUnits from '../../components/content/manage/ManageUnits'

export default function ManageLecturesPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { lang, user } = useSelector(s => s.global)
  const { grades } = useSelector(s => s.groupsState)
  const { lectures } = useSelector(s => s.lecturesState)


  const [getGrades] = useGetGrades()
  const [getData, { isLoading, error }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {
    
    if (!grades) {
      await getGrades()
    }

    const res = await getLectures()
    dispatch(setLectures(res))

  }

  useEffect(() => {
    if (!lectures || !grades) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectures, grades])

  if (error) {
    return <Alert severity='error'>{lang.errors.connection}</Alert>
  }

  if (isLoading || !grades || !lectures) {
    return <LoaderSkeleton />
  }

  if (grades?.length === 0) {
    return <Box>
      <Header title={lang.links.manageLectures} />
      <Alert severity='error'>{lang.errors.addGrade}</Alert>
      <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>{lang.errors.goGradePage}</Button>
    </Box>
  }

  if (user.role === "subAdmin") {
    return <ManageUnits lectures={lectures} grade={user.grade} />
  }

  return (
    <Box>
      <Header title={lang.links.manageLectures} />
      <ManageGrades grades={grades} lectures={lectures} />
    </Box>
  )
}
