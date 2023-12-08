import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionControlled({ exam }) {
    return (
        <Accordion sx={{
            mb: 5, mt: 1,
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant='h4' fontWeight="600"> unit name</Typography>
            </AccordionSummary>
            {/* the content */}
            <AccordionDetails>
                details ....
            </AccordionDetails>
        </Accordion>
    )
}
