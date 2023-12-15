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

    if (!grades && user.role !== 'student') {
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

  if (isLoading) {
    return <LoaderSkeleton />
  }


  if (grades?.length === 0) {
    return <Box sx={{ direction: 'rtl' }}>
      <Header title={lang.links.content} />
      <Alert severity='error'>add grade plz</Alert>
      <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>go to grade page</Button>
    </Box>
  }

  if (user.isAdmin && lectures) {
    return (
      <Stack mt="20px">
        <AllContent lectures={lectures} grades={grades} />
      </Stack>
    )
  }

if(!lectures){
  return <></>
}

  return (
    <Stack>
      <Header title="lecture" />
      <ShowUnits lectures={lectures} />
    </Stack>
  )
}
