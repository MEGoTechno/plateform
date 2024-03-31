import { Box } from '@mui/material'
import React, { useState } from 'react'
import SelectControlled from '../tools/SelectControlled'
import GradeUsers from './GradeUsers'

export default function ManageStatistics({ grades }) {

  const [grade, setGrade] = useState("")

  const handleChange = (e) => {
    setGrade(e.target.value)
  }
  return (
    <Box>
      <SelectControlled
        value={grade}
        handleChange={handleChange}
        title={"choose grade"}
        options={grades} keys={{ label: "gradeName" }} />

      {grade && <GradeUsers grade={grade} />}
    </Box>
  )
}
