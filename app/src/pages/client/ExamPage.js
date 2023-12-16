import React, { useEffect, useState } from 'react'
import GradeExams from '../../components/exams/GradeExams'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import ShowExams from '../../components/user/ShowExams'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetExamsQuery } from '../../toolkit/apiSlice'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import ManageExams from '../../components/exams/ManageExams'
import CreateUnit from '../../components/exams/CreateUnit'
import { getUnique } from '../../components/tools/commonFC'

export default function ExamPage() {
  const { lang } = useSelector(s => s.global)
  const { user, grades } = useSelector(s => s.global)
  const [units, setUnits] = useState(false)
  const [getData, { isLoading, isError, error, data }] = useLazyGetExamsQuery()
  // const [trigger, exams] = useLazyGetData(getData)

  useEffect(() => {
    if (!data) {
      getData()
    }
    if (data) {
      
      const units = getUnique(data, "unitId")
      setUnits(units)
    }
  }, [data])

  if (isLoading) {
    return <LoaderSkeleton />
  }

  if (user.isAdmin) {
    return <ManageExams />
  }


  return (
    <div>
      <Header title={lang.links.exams} />
      {/* <GradeExams /> */}
      <CreateUnit grade={user.grade} units={units} exams={data} />
    </div>
  )
}
