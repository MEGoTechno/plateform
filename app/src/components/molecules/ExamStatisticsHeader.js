import { Box, Paper, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLazyGetExamStatisticsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import { MyResponsivePie } from '../tools/PieChart'
import LoaderSkeleton from '../tools/LoaderSkeleton'

export default function ExamStatisticsHeader({ exam, attempts, fetchStatistics, setGreaterThan, greaterThan, examStatistisc }) {

    const theme = useTheme()



    const changeGT = (e) => {
        setGreaterThan(e.target.value)
    }


    useEffect(() => {
        fetchStatistics()
    }, [greaterThan])



    return (
        <Box>

            <Paper sx={{ p: 1.5, display: "flex", justifyContent: 'space-between', bgcolor: theme.palette.background.alt, flexWrap: 'wrap' }}>
                <Stack mr={1}>
                    <Typography variant='body2' fontSize={16} sx={{ opacity: .8 }}>ExamInfo</Typography>
                    <Typography variant='body2' fontSize={14}>{exam.unitName}</Typography>
                    <Typography variant='body2' fontSize={14}>{exam.lessonName}</Typography>
                    <Typography variant='body2' fontSize={14}>{exam.partName}</Typography>
                </Stack>

                <Box sx={{ flexGrow: .7 }}>
                    <Stack>
                        <Stack>
                            <Typography variant='body2' fontSize={16} sx={{ opacity: .8 }}>time</Typography>
                            <Typography variant='body2' fontSize={14}>{exam.time / 60} min</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant='body2' fontSize={16} sx={{ opacity: .8 }}>total mark</Typography>
                            <Typography variant='body2' fontSize={14}>{exam.questions.reduce((acc, q) => acc += q.points, 0)} points</Typography>
                        </Stack>

                    </Stack>
                    <TextField
                        sx={{ m: '12px 0' }}
                        color='success' label="write number"
                        type='number'
                        value={greaterThan}
                        onChange={changeGT}
                        fullWidth
                    />
                </Box>
            </Paper>

            <Box sx={{ height: '350px', m: '10px 0', color: theme.palette.grey[800], fontWeight: 600 }}>
                {(examStatistisc) ? <MyResponsivePie data={examStatistisc} /> : <LoaderSkeleton />}
            </Box>
        </Box>

    )
}
