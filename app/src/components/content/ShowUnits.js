import { Box, Button } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../tools/commonFC'
import { buttonStyle } from "../styles/buttonsStyles"
import ShowLectures from './ShowLessons'

export default function ShowUnits({ grade, lectures }) {

   const navigate = useNavigate()

   const units = getUnique(lectures, "unitId") //units list

   const goUnit = (unitId) => {

      const lectuersByUnit = getSameValue(lectures, "unitId", unitId) // lectures has same unit
      const lessons = getUnique(lectuersByUnit, "lessonId") // unique lesson
      
      navigate(`/content/${unitId}`, { state: { lectures: lectuersByUnit, lessons, grade } })
   }

   return (
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
   )
}
