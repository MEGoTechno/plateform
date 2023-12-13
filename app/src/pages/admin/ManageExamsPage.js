import React from 'react'
import ManageExams from '../../components/exams/ManageExams'
import { Box } from '@mui/material'
import Header from '../../components/tools/Header'

export default function ManageExamsPage() {
  return (
    <Box>
      <Header title={"manage Exams"}/>
      <ManageExams />
    </Box>
  )
}
