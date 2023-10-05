import React from 'react'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import { Paper, Typography, useTheme } from '@mui/material'

export default function StudyPage() {
  const { lang } = useSelector(s => s.global)
  const theme = useTheme()
  return (
    <>
      <Header title= {lang.links.study} />
      <Paper elevation={3} sx={{
        backgroundColor: theme.palette.primary[600],
        p: 2,
        mt: 2
    }}>
        <Typography>page is underconstruction !</Typography>
    </Paper>
    </>
  )
}
