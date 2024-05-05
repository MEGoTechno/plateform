import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../tools/NotFound'
import { useLazyGetUserAttemptsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import LoaderSkeleton from '../tools/LoaderSkeleton'

import Header from "../tools/Header"
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import UserBody from '../molecules/UserBody'


export default function UserStatistics() {

    const navigate = useNavigate()
    const theme = useTheme()
    const location = useLocation()

    const user = location.state

    const [userAttempts, setUserAttempts] = useState(null)

    const [getData] = useLazyGetUserAttemptsQuery()
    const [getUserAttempts] = useLazyGetData(getData)





    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const trigger = async () => {
        setPageState({ ...pageState, isLoading: true })

        const limit = paginationModel.pageSize
        const page = paginationModel.page + 1

        const res = await getUserAttempts({ userId: user._id, limit, page })
        setUserAttempts(res.attempt)
        setPageState({ isLoading: false, rowCount: res.count })
    }


    useEffect(() => {
        trigger()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationModel.page, paginationModel.pageSize])
    // attempts + exam



    const columns = [{
        field: "_id",
        headerName: "id",
        disableExport: true
    }, {
        field: "timeIn",
        headerName: "time in",
        width: 150,
        renderCell: (params) => {
            const inDate = new Date(params.row.createdAt)
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {inDate.toLocaleDateString()} ==  {inDate.toLocaleTimeString()}
                </Typography>
            )
        }
    }, {
        field: "unitName",
        headerName: "unit name",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.exam?.unitName}
                </Typography>
            )
        }
    }, {
        field: "lessonName",
        headerName: "lesson name",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.exam?.lessonName}
                </Typography>
            )
        }
    }, {
        field: "partName",
        headerName: "part name",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.exam?.partName}
                </Typography>
            )
        }
    }, {
        field: "mark",
        headerName: "mark",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "14px", fontWeight: "600", color: theme.palette.success.main, textAlign: 'center' }} >
                    {Number(params.row.mark)} / {Number(params.row.exam.questions.reduce((acc, question) => acc += question.points, 0))}
                </Typography>
            )
        }
    }, {
        field: "tokenTime",
        headerName: "time",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "14px", fontWeight: "500", color: theme.palette.warning.main, textAlign: 'center' }} >
                    {Number(params.row.tokenTime / 60).toFixed(2)} m
                </Typography>
            )
        }
    }, {
        field: "examTime",
        headerName: "exam time",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "14px", fontWeight: "600", color: theme.palette.warning.main, textAlign: 'center' }} >
                    {Number(params.row.exam.time / 60).toFixed(2)} m
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
                icon={<VisibilityRoundedIcon color='success' />}
                label="show user"
                sx={{
                    color: theme.palette.warning.main,
                }}
                onClick={() => navigate("/management/statistics/user/attempt", { state: params.row })}
            />]
        },
    },
    ]
    
    if (!user) return <NotFound />
    if (!userAttempts) return <LoaderSkeleton />

    return (
        <Box>
            <Header title={user.userName} />
            <Box m={"10px 0"}>
                <UserBody user={user} />
            </Box>
            <Box
                sx={{ height: "70vh", width: '100%', bgcolor: theme.palette.background.alt }}
            >
                <DataGrid
                    sx={{ bgcolor: theme.palette.background.alt }}

                    columns={columns}
                    rows={userAttempts || []}
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
