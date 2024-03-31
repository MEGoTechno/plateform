import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { MyResponsivePie } from '../tools/PieChart'

export default function HomeStatisticsCard({ icon, label, count, colorSchema }) {

    const dataChart = [
        {
            "id": label,
            "value": count || 0,
            "color": "hsl(288, 70%, 50%)"
        }
    ]

    const theme = useTheme()

    return (
        <Paper
            elevation={2}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', p: "10px 20px",
                bgcolor: theme.palette.background.alt,
                borderRadius: 6
            }}>

            <Stack direction={"column"} gap={1}>
                {icon}
                <Typography>{label}</Typography>
                <Typography> +{count}</Typography>
            </Stack>

            <Stack direction={"column"} alignItems={"center"}>
                <Box sx={{ height: '100px', width: "100px", color: theme.palette.grey[800], fontWeight: 600 }}>
                    <MyResponsivePie
                        data={dataChart}
                        innerR={.6}
                        isNotLegend={true} colorSchema={colorSchema}
                        margin={{ tp: 10, rt: 0, bt: 10, lt: 0 }}
                        isLinkArc={false}
                    />
                </Box>
                <Typography sx={{ opacity: .4, mt: '-5px' }}>+{count} {label}</Typography>
            </Stack>
        </Paper>
    )
}
