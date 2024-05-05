import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../tools/commonFC'
import { useSelector } from 'react-redux'
import { Alert, Box, Button } from '@mui/material'
import { buttonStyle } from '../../styles/buttonsStyles'

import CastForEducationSharpIcon from '@mui/icons-material/CastForEducationSharp';
export default function UnitExams({ exams, grade }) {

  const navigate = useNavigate()
  const units = getUnique(exams, "unitId") //units list
  const { lang } = useSelector(s => s.global)

  const goUnit = (unitId) => {

    const unitExams = getSameValue(exams, "unitId", unitId) // exmas has same unit
    const lessons = getUnique(unitExams, "lessonId") // unique lesson

    navigate(`/exams/${unitId}`, { state: { exams: unitExams, lessons, grade } })
  }

  if (!exams || exams?.length === 0) {
    return <Alert severity='error'> لا يوجد محاضرات لهذه السنه</Alert>

  }

  return (
    <Box>
      <Box sx={{
        display: "flex", alignItems: "center", flexDirection: "column",
      }}>

        {units && units.map((unit, i) => (
          <Box key={i} sx={{ width: "100%" }}>

            <Button sx={buttonStyle} varient="contained" onClick={() => { goUnit(unit.unitId) }}>
              {unit.unitName} <CastForEducationSharpIcon sx={{ml: 1}}/>
            </Button>

          </Box>
        ))}
      </Box>
    </Box>
  )
}
