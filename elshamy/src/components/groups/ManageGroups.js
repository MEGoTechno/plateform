import { Box, Button } from '@mui/material'
import React, { useMemo } from 'react'
import ShowGroups from './ShowGroups'
import { sendSuccess } from '../styles/buttonsStyles'
import { useNavigate } from 'react-router-dom'

export default function ManageGroups({ groups, grades }) {

    const navigate = useNavigate()
    const clonedGrade = useMemo(() => JSON.parse(JSON.stringify(grades)), [grades])

    const gradeGroups = () => {
        if (groups?.length > 0)
            clonedGrade.map(grade => {
                const sameGroups = groups.filter(group => group.grade === grade._id)
                return grade.groups = sameGroups
            })

        return clonedGrade
    }

    return (
        <Box>
            <ShowGroups grades={gradeGroups()} />
            <Button onClick={() => navigate("/management/years/add-grade", { state: { gradeId: `g${grades.length + 1}` } })} sx={sendSuccess}>add grade</Button>
        </Box>
    )
}
