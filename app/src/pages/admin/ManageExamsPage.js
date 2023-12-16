import React from 'react'
import ManageExams from '../../components/exams/ManageExams'
import { Box } from '@mui/material'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function ManageExamsPage() {
  const { lang, user } = useSelector(s => s.global)
  const location = useLocation()
  const isManage = location.pathname.split("/")[1] === "management"

  return (
    <Box>
      {user.isAdmin && isManage && (
        <Header title={lang.links.manageExams} />
      )}
      <ManageExams />
    </Box>
  )
}
