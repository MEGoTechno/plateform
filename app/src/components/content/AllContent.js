import React, { useState } from 'react'
import TabsControlled, { CustomTabPanel } from '../tools/TabsControlled'
import ShowUnits from './ShowUnits'
import { getSameValue } from '../tools/commonFC'
import { Box } from '@mui/material'

export default function AllContent({ grades, lectures }) {
    const [value, setValue] = useState(0)
    const gradedLectures = getSameValue(lectures, "gradeId", grades[value].gradeId) // get lectures same grade 

    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <ShowUnits lectures={gradedLectures} grade={grade} />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
