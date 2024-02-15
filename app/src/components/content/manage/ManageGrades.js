import { Box } from '@mui/material'
import React, { useState } from 'react'
import TabsControlled, { CustomTabPanel } from '../../tools/TabsControlled'
import { getSameValue } from '../../tools/commonFC'
import ManageUnits from './ManageUnits'

export default function ManageGrades({ grades, lectures }) {
    const [value, setValue] = useState(0)
    const gradedLectures = getSameValue(lectures, "grade", grades[value]._id) // get lectures same grade 

    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <ManageUnits lectures={gradedLectures} grade={grade} />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
