import React, { useEffect } from 'react'
import { Alert, Box, Button } from '@mui/material'
import Header from '../../components/tools/Header'
import { useSelector } from 'react-redux'
import ManageStatistics from '../../components/statistics/ManageStatistics'
import { useNavigate } from 'react-router-dom'
import useGetGrades from '../../hooks/useGetGrades'
import LoaderSkeleton from '../../components/tools/LoaderSkeleton'
import { buttonStyle } from '../../styles/buttonsStyles'


export default function ManageStatisticsPage() {
    const navigate = useNavigate()

    const { lang } = useSelector(s => s.global)
    const { grades } = useSelector(s => s.groupsState)

    const [getGrades] = useGetGrades()

    useEffect(() => {
        if (!grades) {
            getGrades()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grades])


    if (!grades) return <LoaderSkeleton />

    if (grades?.length === 0) {
        return <Box>
            <Header title={lang.links.manageLectures} />
            <Alert severity='error'>{lang.errors.addGrade}</Alert>
            <Button sx={buttonStyle} onClick={() => navigate("/management/years")}>{lang.errors.goGradePage}</Button>
        </Box>
    }

    return (
        <Box>
            <Header title={"statistics"} />
            <ManageStatistics grades={grades} />
        </Box>
    )
}
