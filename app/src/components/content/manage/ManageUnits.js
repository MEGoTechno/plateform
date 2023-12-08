import { Box, Button, Card, CardHeader, Divider } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'

export default function ManageUnits({ grade, lectures }) {
    const navigate = useNavigate()
    const units = getUnique(lectures, "unitId") //units list

    const showUnit = (unit) => {
        const unitLectures = getSameValue(lectures, "unitId", unit.unitId)
        const lessons = getUnique(unitLectures, "lessonId")
        navigate("/management/content/unit", { state: { lectures: unitLectures, lessons, grade } })
    }

    const editUnit = (unit) => {
        navigate("/management/content/edit", { state: { changeKey: "unitName", by: "unitId", value: unit.unitName, id: unit.unitId } })
    }

    const createUnit = () => {
        let i = units.length + 1
        const gradeId = grade.gradeId
        const gradeName = grade.gradeName
        const unitId = grade.gradeId + `u${i}`
        const lessonId = unitId + `l1`
        const partId = lessonId + `p1`
        navigate("/management/content/add-lecture", {
            state: {
                gradeId, gradeName, unitId, lessonId, partId
            }
        })
    }

    return (
        <Box>
            {units && units.map((unit, i) => (
                <Box key={i} sx={{ width: "100%" }}>
                    <Card sx={{ width: "100%", height: "auto" }}>
                        <CardHeader
                            action={
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Button onClick={() => editUnit(unit)}>
                                        edit
                                    </Button>
                                    <Button onClick={() => showUnit(unit)}>
                                        show
                                    </Button>
                                </Box>
                            }
                            title={unit.unitName}
                            subheader={unit.createdAt.split("T")[0]}
                        />
                    </Card>
                </Box>
            ))}

            <Button onClick={createUnit}>add unit</Button>
        </Box>
    )
}
