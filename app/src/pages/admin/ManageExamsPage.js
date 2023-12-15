import React from 'react'
import ManageExams from '../../components/exams/ManageExams'
import { Box } from '@mui/material'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'

export default function ManageExamsPage() {
  const {lang} = useSelector(s => s.global)
  return (
    <Box>
      <Header title={lang.links.manageExams}/>
      <ManageExams />
    </Box>
  )
}
