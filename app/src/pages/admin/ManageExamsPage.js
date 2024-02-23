import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/tools/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetExamsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import { setExams } from '../../toolkit/examSlice'
import ManageGrades from '../../components/exams/manage/ManageGrades'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import useGetGrades from '../../hooks/useGetGrades'
import { user_roles } from '../../components/constants/roles'

export default function ManageExamsPage() {
  const dispatch = useDispatch()

  const { lang } = useSelector(s => s.global)
  const { exams } = useSelector(s => s.examsState)
  const { grades } = useSelector(s => s.groupsState)
  const [error, setError] = useState("")

  const [getGrades] = useGetGrades()

  const [getData, { isLoading }] = useLazyGetExamsQuery()
  const [getExams] = useLazyGetData(getData)

  const trigger = async () => {
    try {
      if (!grades) {
        await getGrades()
      }

      const res = await getExams()
      dispatch(setExams(res))
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {
    if (!exams) {
      trigger()
    }
  }, [exams])

  if (error) {
    return <></>
  }
  if (isLoading || !grades || !exams) {
    return <LoaderSkeleton />
  }

  return (
    <Box>
      <Header title={lang.links.manageExams} />
      <ManageGrades grades={grades} exams={exams} />
    </Box>
  )
}
