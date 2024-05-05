import { Box, Button, Card, CardHeader, Divider, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import { useSelector } from 'react-redux'
import Unit from '../../molecules/Unit'

export default function ManageUnits({ grade, lectures }) {
    console.log(lectures)
    const theme = useTheme()
    const navigate = useNavigate()

    const { lang } = useSelector(s => s.global)

    const units = getUnique(lectures, "unitId") //units list

    const showUnit = (unit) => {
        const unitLectures = getSameValue(lectures, "unitId", unit.unitId)
        const lessons = getUnique(unitLectures, "lessonId")
        navigate(`/management/lectures/${unit.unitId}`, { state: { lectures: unitLectures, lessons, grade } })
    }

    const editUnit = (unit) => {
        navigate("/management/lectures/edit-name", { state: { changeKey: "unitName", by: "unitId", value: unit.unitName, id: unit.unitId } })
    }

    const createUnit = () => {

        const gradeId = grade._id

        // const gradeName = grade.gradeName
        // const unitId = grade.gradeId + `u${i}`
        // const lessonId = unitId + `l1`
        // const partId = lessonId + `p1`

        navigate("/management/lectures/add", {
            state: {
                gradeId
            }
        })
    }

    return (
        <Unit units={units} editUnit={editUnit} showUnit={showUnit} createUnit={createUnit} />
    )
}
