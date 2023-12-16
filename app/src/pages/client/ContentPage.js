import React, { useEffect, useState } from 'react'
import ShowUnits from '../../components/content/ShowUnits'
import { useDispatch, useSelector } from 'react-redux'
import AllContent from '../../components/content/AllContent'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { setLectures } from '../../toolkit/contentSlice'
import useGetGrades from '../../hooks/useGetGrades'
import { Alert, Box, Button, Stack } from '@mui/material'
import Header from '../../components/tools/Header'
import { buttonStyle } from '../../components/styles/buttonsStyles'
import { useNavigate } from 'react-router-dom'

export default function ContentPage() {
  const { user, lang } = useSelector(s => s.global)
  const [getGrades, grades] = useGetGrades()

  const { lectures } = useSelector(s => s.content)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [getData, { isLoading, error }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {

    if (!grades && user.isAdmin) {
      await getGrades()
    }

    const lectures = await getLectures()
    dispatch(setLectures(lectures))
  }
  useEffect(() => {
    if (!lectures || !grades) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading || !lectures) {
    return <LoaderSkeleton />
  }


  if (grades?.length === 0) {
    return <Box sx={{ direction: 'rtl' }}>
      <Header title={lang.links.content} />
      <Alert severity='error'>اضف مجموعه</Alert>
    </Box>
  }

  if (error) {
    return <Alert severity='error'>{lang.errors.connection}</Alert>
  }
 
  if (user.isAdmin && lectures && grades) {
    return (
      <Stack mt="20px">
        <AllContent lectures={lectures} grades={grades} />
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
