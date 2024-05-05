import { Box, Button, Card, CardHeader, Divider, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'
import { useSelector } from 'react-redux'
import Unit from '../../molecules/Unit'

export default function ManageUnits({ grade, exams }) {

    const navigate = useNavigate()
    const units = getUnique(exams, "unitId") //units list

    const showUnit = (unit) => {
        const unitExams = getSameValue(exams, "unitId", unit.unitId)
        const lessons = getUnique(unitExams, "lessonId")
        navigate(`/management/exams/${unit.unitId}`, { state: { exams: unitExams, lessons, grade } })
    }

    const editUnit = (unit) => {
        navigate("/management/exams/edit-name", { state: { changeKey: "unitName", by: "unitId", value: unit.unitName, id: unit.unitId } })
    }

    const createUnit = () => {

        const gradeId = grade._id

        navigate("/management/exams/add", {
            state: {
                gradeId
            }
        })
    }

    return (
        <Unit units={units} editUnit={editUnit} showUnit={showUnit} createUnit={createUnit} />
    )
}
