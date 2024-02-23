import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DAYES } from '../constants/dateConstants';

export default function UserGroup({ group }) {

    const theme = useTheme()

    return (
        <Accordion sx={{
            bgcolor: theme.palette.background.alt
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant='h4' fontWeight="600"> {group.groupName}</Typography>
            </AccordionSummary>
            {/* the content */}
            <AccordionDetails>

                {group.days && group.days.map((day, i) => {
                    return <Stack direction={"row"} key={i}>

                        <Typography variant='h5' fontWeight={600} color={theme.palette.success.main}>{DAYES[day.dayIndex]}</Typography>
                        <Typography m={"0 5px"}>{day.time}</Typography>

                    </Stack>
                })}

            </AccordionDetails>
        </Accordion>
    )
}
