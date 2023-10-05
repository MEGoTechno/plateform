import React from 'react'
import GradeExams from '../../components/user/GradeExams'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'

export default function ExamPage() {
  const { lang } = useSelector(s => s.global)
  return (
    <div>
      <Header title={lang.links.exams} />
      <GradeExams />
    </div>
  )
}
