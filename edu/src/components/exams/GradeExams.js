import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSameValue } from '../tools/commonFC'
import TabsControlled, { CustomTabPanel } from '../tools/TabsControlled'

import UnitExams from './UnitExams'

export default function GradeExams({ exams, grades }) {
    const [value, setValue] = useState(0)
    const gradeExams = getSameValue(exams, "grade", grades[value]._id) // get exams same grade 
    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />

            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <UnitExams exams={gradeExams} grade={grade} />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
