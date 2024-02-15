import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TabsControlled, { CustomTabPanel } from '../../tools/TabsControlled'
import { getSameValue } from '../../tools/commonFC'
import ManageUnits from './ManageUnits'

export default function ManageGrades({exams, grades}) {
    const [value, setValue] = useState(0)
    const gradedExams = getSameValue(exams, "grade", grades[value]._id) // get exams same grade 



    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <ManageUnits exams={gradedExams} grade={grade} />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
