import { Avatar, Badge, Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGetUsers from '../../hooks/useGetUsers'
import { user_roles } from '../constants/roles'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import RankingUsers from '../molecules/RankingUsers'
import LoaderSkeleton from '../tools/LoaderSkeleton'
import { useLazyGetUsersStatisticsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom'

export default function GradeUsers({ grade }) {

    const navigate = useNavigate()
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const [users, setUsers] = useState(null)



    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const [getUsers] = useGetUsers()



    const trigger = async () => {
        const res = await getUsers(setPageState, paginationModel, null, { grade: grade._id, role: user_roles.STUDENT })
        setUsers(res)
    }

    useEffect(() => {
        trigger()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationModel, paginationModel.page, paginationModel.pageSize, grade])

    const columns = [{
        field: "_id",
        headerName: "id",
        disableExport: true
    }, {
        field: "avatar",
        headerName: "صوره",
        disableExport: true,
        renderCell: (params) => {
            return (
                <Avatar sx={{ bgcolor: theme.palette.secondary[500] }}>
                    {params.row.userName ? params.row.userName[0].toUpperCase() : false}
                </Avatar>
            )
        }
    }, {
        field: "userName",
        headerName: lang.users.userName,
        width: 150,
    }, {
        field: "name",
        headerName: lang.users.name,
        width: 150,
    }, {
        field: "isActive",
        headerName: lang.users.isActive,
        type: "boolean",
        editable: true
    }, {
        field: "group",
        headerName: "group",
        type: 'singleSelect',
        filterable: false,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.group?.groupName ? params.row.group?.groupName : 'لم يسجل'}
                </Typography>
            )
        }
    }, {
        field: "totalPoints",
        headerName: "points",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "14px", fontWeight: "600", color: theme.palette.success.main, textAlign: 'center' }} >
                    {Number(params.row.totalPoints)}
                </Typography>
            )
        }
    }, {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        cellClassName: 'actions',
        getActions: (params) => {

            return [<GridActionsCellItem
                icon={<QueryStatsIcon />}
                label="show user"
                sx={{
                    color: theme.palette.warning.main,
                }}
                onClick={() => navigate("/management/statistics/user", { state: params.row })}
            />]
        },
    },
    ]

    const [usersStatistics, setUsersStatistics] = useState(null)

    const [getData] = useLazyGetUsersStatisticsQuery()
    const [getUsersStatistics] = useLazyGetData(getData)

    const getSTatis = async () => {
        const res = await getUsersStatistics(grade._id)
        setUsersStatistics(res)
    }

    useEffect(() => {

        getSTatis()

    }, [grade])

    if (!users) return <LoaderSkeleton />

    return (
        <Box>

            <Box m={'10px 0'} >
                <RankingUsers usersStatistics={usersStatistics} />
            </Box>

            <Box
                sx={{ height: "70vh", width: '100%', bgcolor: theme.palette.background.alt }}
            >
                <DataGrid
                    sx={{ bgcolor: theme.palette.background.alt }}

                    columns={columns}
                    rows={users || []}
                    getRowId={row => row._id}
                    loading={pageState.isLoading || false}
                    rowCount={pageState.rowCount} // ===> total for server (.length)
                    pageSizeOptions={[5, 10, 50, 100]}

                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

                    columnVisibilityModel={{
                        // Hide columns status and traderName, the other columns will remain visible
                        _id: false,
                    }}
                />
            </Box>
        </Box>
    )
}
