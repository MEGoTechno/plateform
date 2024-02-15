import { useState } from "react"
import { getSameValue } from "../tools/commonFC"
import { Box } from "@mui/material"
import TabsControlled, { CustomTabPanel } from "../tools/TabsControlled"

export default function ManageGrades(props) {
    const { grades, data, children } = props
    const [value, setValue] = useState(0)
    const TestComp = () => {
        const Compo = children
        return <Compo />
    }
    return (
        <Box>
            <TabsControlled value={value} setValue={setValue} items={grades} by="gradeName" />
            {grades && grades.map((grade, i) => {
                return (
                    <CustomTabPanel key={i} value={value} index={i}>
                        <TestComp />
                    </CustomTabPanel>
                )
            })}
        </Box>
    )
}
