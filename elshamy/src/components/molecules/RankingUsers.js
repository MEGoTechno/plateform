import { Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'


import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import LoaderSkeleton from '../tools/LoaderSkeleton';

export default function RankingUsers({ usersStatistics }) {


    const theme = useTheme()


    if (!usersStatistics) return <LoaderSkeleton />
    
    return (
        <Paper elevation={1} sx={{ p: "10px", bgcolor: theme.palette.background.alt }}>
            <Stack direction={"column"} gap={2} alignItems={"center"}>
                <Stack direction={"row"} gap={1} >
                    <VerifiedSharpIcon color="success" />
                    <Typography variant='h6' fontWeight={600}>best score</Typography>
                    <Typography>{usersStatistics.largest || 0}</Typography>
                </Stack>

                <Stack direction={"row"} gap={1} >
                    <DataSaverOffRoundedIcon color="secondary" />
                    <Typography variant='h6' fontWeight={600}>ِAverage</Typography>
                    <Typography>{usersStatistics.average?.toFixed(2) || 0}</Typography>
                </Stack>

                <Stack direction={"row"} gap={1} >
                    <ThumbDownAltRoundedIcon color="error" />
                    <Typography variant='h6' fontWeight={600}>worst</Typography>
                    <Typography >{usersStatistics.smallest || 0}</Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}
