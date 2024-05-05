import React, { useEffect, useState } from 'react'
import ShowUnits from '../../components/content/ShowUnits'
import { useDispatch, useSelector } from 'react-redux'
import AllLectures from '../../components/content/GradeLectures'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { setLectures } from '../../toolkit/lecturesSlice'
import useGetGrades from '../../hooks/useGetGrades'
import { Alert, Box, Button, Stack } from '@mui/material'
import Header from '../../components/tools/Header'
import { user_roles } from '../../components/constants/roles'
import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'

export default function LecturesPage() {
  const dispatch = useDispatch()

  const { user, lang } = useSelector(s => s.global)
  const [getGrades] = useGetGrades()
  const { lectures } = useSelector(s => s.lecturesState)
  const { grades } = useSelector(s => s.groupsState)

  const [getData, { isLoading, error }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {

    if (!grades && user.role !== user_roles.STUDENT) {
      await getGrades()
    }

    if (!lectures) {
      const lectures = await getLectures()
      dispatch(setLectures(lectures))
    }

  }

  useEffect(() => {
    if (!lectures || !grades) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectures, grades])

  if (isLoading || !lectures) return <LoaderSkeleton />

  if (!grades && user.role !== user_roles.STUDENT) return <LoaderSkeleton />


  if (grades?.length === 0) {
    return <Box sx={{ direction: 'rtl' }}>
      <Header title={lang.links.content} />
      <Alert severity='error'>اضف مجموعه</Alert>
    </Box>
  }

  if (error) return <Alert severity='error'>{lang.errors.connection}</Alert>

  if (user.role !== user_roles.STUDENT && lectures && grades) {
    return (
      <Stack >
        <Header title="lectures" />
        <AllLectures lectures={lectures} grades={grades} />
      </Stack>
    )
  }

  return (
    <Stack>
      <Header title="lecture" />
      <ShowUnits lectures={lectures} />
    </Stack>
  )
}
