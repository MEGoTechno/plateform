import { Alert, Box, Button, useTheme } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../tools/commonFC'
import { buttonStyle } from "../styles/buttonsStyles"
import ShowLectures from './ShowLessons'
import Header from '../tools/Header'
import { useSelector } from 'react-redux'

export default function ShowUnits({ grade, lectures }) {
   const navigate = useNavigate()
   const theme = useTheme()
   const units = getUnique(lectures, "unitId") //units list
   const {lang} = useSelector(s => s.global)

   const goUnit = (unitId) => {

      const lectuersByUnit = getSameValue(lectures, "unitId", unitId) // lectures has same unit
      const lessons = getUnique(lectuersByUnit, "lessonId") // unique lesson

      navigate(`/content/${unitId}`, { state: { lectures: lectuersByUnit, lessons, grade } })
   }

   if (!lectures || lectures?.length === 0) {
      return <Alert severity='error'> لا يوجد محاضرات لهذه السنه</Alert>

   }


   return (
      <Box>
         <Header title={lang.content.units} />

         <Box sx={{
            display: "flex", alignItems: "center", flexDirection: "column",
         }}>
            {units && units.map((unit, i) => (
               <Box key={i} sx={{ width: "100%" }}>
                  <Button sx={buttonStyle} varient="contained" onClick={() => { goUnit(unit.unitId) }}>
                     {unit.unitName}
                  </Button>
               </Box>
            ))}
         </Box>
      </Box>
   )
}
