import React, { useState } from 'react'
import TabsControlled, { CustomTabPanel } from '../tools/TabsControlled'
import ShowUnits from './ShowUnits'
import { getSameValue } from '../tools/commonFC'
import { Box } from '@mui/material'

export default function AllLectures({ grades, lectures }) {
    const [value, setValue] = useState(0)
    const gradeLectures = getSameValue(lectures, "grade", grades[value]._id) // get lectures same grade 

    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <ShowUnits lectures={gradeLectures} grade={grade} />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
