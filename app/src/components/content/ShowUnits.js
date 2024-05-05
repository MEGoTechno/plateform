import { Alert, Box, Button, useTheme } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../tools/commonFC'
import { StyledBtn, buttonStyle } from "../../styles/buttonsStyles"
import ShowLectures from './LessonLectures'
import Header from '../tools/Header'
import { useSelector } from 'react-redux'
import CastForEducationSharpIcon from '@mui/icons-material/CastForEducationSharp';



export default function ShowUnits({ grade, lectures }) {

   const navigate = useNavigate()
   const units = getUnique(lectures, "unitId") //units list
   const { lang } = useSelector(s => s.global)

   const goUnit = (unitId) => {

      const lectuersByUnit = getSameValue(lectures, "unitId", unitId) // lectures has same unit
      const lessons = getUnique(lectuersByUnit, "lessonId") // unique lesson

      navigate(`/lectures/${unitId}`, { state: { lectures: lectuersByUnit, lessons, grade } })
   }


   if (!lectures || lectures?.length === 0) {
      return <Alert severity='error'> لا يوجد محاضرات لهذه السنه</Alert>

   }

   return (
      <Box>
         <Box sx={{
            display: "flex", alignItems: "center", flexDirection: "column",
         }}>

            {units && units.map((unit, i) => (
               <Box key={i} sx={{ width: "100%", }}>
                  <StyledBtn varient="contained" onClick={() => { goUnit(unit.unitId) }}>
                     {unit.unitName}   <CastForEducationSharpIcon sx={{ml: 1}} />
                  </StyledBtn>
               </Box>
            ))}
         </Box>
      </Box>
   )
}
