import { Box, Button, Card, CardHeader, Divider, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSameValue, getUnique } from '../../tools/commonFC'

export default function ManageUnits({ grade, lectures }) {
    const navigate = useNavigate()
    const units = getUnique(lectures, "unitId") //units list
    const theme = useTheme()

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
                <Box key={i} sx={{ width: "100%", }}>
                    <Card sx={{ width: "100%", mt: "10px", height: "auto", bgcolor: theme.palette.background.alt }}>
                        <CardHeader
                            action={
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.secondary[400],
                                            color: theme.palette.primary[500],
                                            fontWeight: 500,
                                            mb: "10px",
                                            "&:hover": {
                                                bgcolor: theme.palette.secondary[500]
                                            }
                                        }}
                                        onClick={() => editUnit(unit)}>
                                        edit
                                    </Button>
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.secondary[400],
                                            color: theme.palette.primary[500],
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: theme.palette.secondary[500]
                                            }
                                        }}
                                        onClick={() => showUnit(unit)}>
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

            <Button
                sx={{
                    bgcolor: theme.palette.success.main,
                    color: theme.palette.grey[50],
                    fontWeight: 500,
                    mt: "10px",
                    "&:hover": {
                        bgcolor: theme.palette.success.light
                    }
                }}
                onClick={createUnit}>add unit</Button>
        </Box>
    )
}
