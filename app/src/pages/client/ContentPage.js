import React, { useEffect, useState } from 'react'
import ShowUnits from '../../components/content/ShowUnits'
import { useDispatch, useSelector } from 'react-redux'
import AllContent from '../../components/content/AllContent'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { setLectures } from '../../toolkit/contentSlice'
import useGetGrades from '../../hooks/useGetGrades'
import { Box, Stack } from '@mui/material'
import Header from '../../components/tools/Header'

export default function ContentPage() {
  const { user } = useSelector(s => s.global)
  const [getGrades, grades] = useGetGrades()

  const { lectures } = useSelector(s => s.content)
  const dispatch = useDispatch()

  const [getData, { isLoading }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {

    if (!grades && user.role !== 'student') {
      await getGrades()
    }

    const lectures = await getLectures()
    dispatch(setLectures(lectures))
  }

  useEffect(() => {
    if (!lectures) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <LoaderSkeleton />
  }

  if (!lectures || lectures?.length === 0) {
    return <>no lectures </>
  }
  if (user.isAdmin) {
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
