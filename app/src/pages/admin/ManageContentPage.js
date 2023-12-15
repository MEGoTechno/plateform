import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageContent from '../../components/content/manage/ManageContent'
// import { lecturess } from '../../components/content/data'
import { useLazyGetLecturesQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from "../../components/tools/LoaderSkeleton"
import { setLectures } from '../../toolkit/contentSlice'
import { Alert, Box, Button } from '@mui/material'
import useGetGrades from '../../hooks/useGetGrades'
import Header from '../../components/tools/Header'
import { buttonStyle } from '../../components/styles/buttonsStyles'
import { useNavigate } from 'react-router-dom'

export default function ManageContentPage() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [getGrades, grades] = useGetGrades()
  const { content: { lectures } } = useSelector(s => s)
  const [error, setError] = useState(null)

  const [getData, { isLoading, }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {
    try {
      if (!grades) {
        await getGrades()
      }

      const res = await getLectures()
      dispatch(setLectures(res))
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {
    if (!lectures || !grades) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!lectures || !grades) {
    return <LoaderSkeleton />
  }

  if (grades?.length === 0) {
    return <Box>
      <Header title={"content"} />
      <Alert severity='error'>add grade plz</Alert>
      <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>go to grade page</Button>
    </Box>
  }


  if (error) {
    return <Alert severity='error'>connection confused</Alert>
  }

  return (
    <Box>
      <Header title={"content"} />
      <ManageContent grades={grades} lectures={lectures} />
    </Box>
  )
}
