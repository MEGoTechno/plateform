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
import ManageUnits from '../../components/content/manage/ManageUnits'

export default function ManageContentPage() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [getGrades, grades] = useGetGrades()
  const { content: { lectures } } = useSelector(s => s)
  const { lang, user } = useSelector(s => s.global)
  const [error, setError] = useState(null)

  const [getData, { isLoading, }] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const trigger = async () => {
    try {
      if (!grades && user.isAdmin) {
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

  if (!lectures) {
    return <LoaderSkeleton />
  }

  if (grades?.length === 0) {
    return <Box>
      <Header title={lang.links.manageLectures} />
      <Alert severity='error'>{lang.errors.addGrade}</Alert>
      <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>{lang.errors.goGradePage}</Button>
    </Box>
  }


  if (error) {
    return <Alert severity='error'>{lang.errors.connection}</Alert>
  }

  if (user.role === "subAdmin") {
    return <ManageUnits lectures={lectures} grade={user.grade} />
  }

  return (
    <Box>
      <Header title={lang.links.manageLectures} />
      <ManageContent grades={grades} lectures={lectures} />
    </Box>
  )
}
