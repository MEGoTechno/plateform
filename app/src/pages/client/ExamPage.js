import React, { useEffect } from 'react'
import GradeExams from '../../components/exams/GradeExams'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import ShowExams from '../../components/user/ShowExams'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetExamsQuery } from '../../toolkit/apiSlice'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'

export default function ExamPage() {
  const { lang } = useSelector(s => s.global)
  const { user, grades } = useSelector(s => s.global)

  const [getData, { isLoading, isError, error }] = useLazyGetExamsQuery()
  const [trigger, exams] = useLazyGetData(getData)

  useEffect(() => {
    trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!exams) {
    return <LoaderSkeleton />
  }

  // if (user.isAdmin) {
  //   return <AllContent lectures={lectures} grades={grades} />
  // }


  return (
    <div>
      <Header title={lang.links.exams} />
      {/* <GradeExams /> */}
      <ShowExams />
    </div>
  )
}
