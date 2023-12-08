import React from 'react'
import { currentExams } from "../management/current"
import CreateUnit from "../exams/CreateUnit"
import CreateExam from "../exams/CreateExam"
import { useSelector } from 'react-redux'
import { getUnique } from '../tools/commonFC'
import { Box } from '@mui/material'
import TabsControlled, { CustomTabPanel } from '../tools/TabsControlled'

export default function ShowExams() {
    const { user, grades } = useSelector(s => s.global)
    const [value, setValue] = React.useState(0);
    console.log(user)
    console.log(currentExams)
    // push UNITS to unique array {unitId, unitName}
    let getUnits = []
    currentExams.forEach(({ unitId, unitName }) => {
        getUnits.push({ unitId, unitName })
    })
    const units = getUnique(getUnits)
    return (
        <div>
            {user && user.grade && !user.isAdmin ? (
                <CreateUnit gradeId={user.grade} units={units} exams={currentExams} />
            ) : (
                !grades ? "add grade first" : (
                    <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column", mt: 5 }}>
                        <TabsControlled value={value} setValue={setValue} items={grades} />
                        {grades && grades.map((grade, i) => {
                            return (
                                <CustomTabPanel key={i} value={value} index={i}>
                                    <CreateUnit gradeId={grade.gradeId} units={units} exams={currentExams} />
                                </CustomTabPanel>
                            )
                        })}
                    </Box>
                ))}
        </div>
    )
}
