import { Box, Grid, IconButton, ImageListItem, ImageListItemBar, Paper, Stack, Typography, useTheme, TabPanel, ImageList } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useLazyGetHomeStatisticsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'

import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import HomeStatisticsCard from '../molecules/HomeStatisticsCard'
import Groups3Icon from '@mui/icons-material/Groups3';
import QuizIcon from '@mui/icons-material/Quiz';

import LatestNews from '../molecules/LatestNews'
import { useSelector } from 'react-redux';

export default function AdminHome() {

    const [homeStatistics, setStatistics] = useState(null)
    const {lang} = useSelector(s => s.global)
    const theme = useTheme()
    const [getData] = useLazyGetHomeStatisticsQuery()
    const [getStatistics] = useLazyGetData(getData)


    const trigger = async () => {
        const res = await getStatistics()
        setStatistics(res)
    }

    useEffect(() => {
        trigger()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            <Grid container gap={1} justifyContent={"center"}>
                <Grid item sm={3.9}>

                    <HomeStatisticsCard
                        icon={<PeopleAltTwoToneIcon color='success' />}
                        label={lang.users.users}
                        count={homeStatistics?.usersCount}
                        colorSchema={"nivo"}
                    />
                </Grid>

                <Grid item sm={3.9}>
                    <HomeStatisticsCard
                        icon={<Groups3Icon color='warning' />}
                        label={lang.groups.groups}
                        count={homeStatistics?.groupsCount}
                        colorSchema={"category10"}
                    />
                </Grid>

                <Grid item sm={3.9}>
                    <HomeStatisticsCard
                        icon={<QuizIcon color='error' />}
                        label={lang.exams.exams}
                        count={homeStatistics?.examsCount}
                        colorSchema={"dark2"}
                    />
                </Grid>

            </Grid>

            <LatestNews />
        </Box >
    )
}
