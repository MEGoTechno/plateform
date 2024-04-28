import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLazyGetExamAttemptsQuery, useLazyGetExamStatisticsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../tools/LoaderSkeleton'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'


import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Header from '../tools/Header'
import ExamStatisticsHeader from '../molecules/ExamStatisticsHeader'
import MakeTitle from '../tools/MakeTitle'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';
import { useSelector } from 'react-redux'

export default function ExamStatistics() {

    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()
    const theme = useTheme()
    const location = useLocation()
    const exam = location.state

    const [attempts, setAttempts] = useState(null)

    const [getData] = useLazyGetExamAttemptsQuery()
    const [getAttempts] = useLazyGetData(getData)

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

        const res = await getAttempts({ examId: exam._id, limit, page })
        setAttempts(res.attempts)
        setPageState({ isLoading: false, rowCount: res.count })
    }

    useEffect(() => {
        trigger()
    }, [paginationModel, paginationModel.page, paginationModel.pageSize])


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
        field: "user",
        headerName: "user name",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.user?.userName}
                </Typography>
            )
        }
    }, {
        field: "name",
        headerName: "name",
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.user?.name}
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

    // #######################################
    const [examStatistisc, setExamStatistics] = useState(null)
    const [greaterThan, setGreaterThan] = useState(0)
    const [notAnsweredUsers, setNotAnswered] = useState(null)

    const [getStatistics] = useLazyGetExamStatisticsQuery()
    const [getExamStatistics] = useLazyGetData(getStatistics)

    const fetchStatistics = async () => {
        const res = await getExamStatistics({ examId: exam._id, grade: exam.grade, filterGt: greaterThan })
        setNotAnswered(res.notAnsweredUsers)
        setExamStatistics([
            {
                "id": "NotAnswered",
                "label": "Not answered",
                "value": Number(res.notAnsweredCount),
                "color": "hsl(181, 70%, 50%)"
            },
            {
                "id": "graterThan",
                "label": "choose gt",
                "value": Number(res.graterThan),
                "color": "green"
            },
            {
                "id": "lessThan",
                "label": "less than",
                "value": Number(attempts?.length - res.graterThan),
                "color": "hsl(326, 70%, 50%)"
            },
        ])
    }

    const notAnsweredCol = [{
        field: "_id",
        headerName: "id",
        disableExport: true
    }, {
        field: "avatar",
        headerName: "صوره",
        disableExport: true,
        renderCell: (params) => {
            return (
                <Avatar alt={params.row.name.toUpperCase()} src={params.row?.avatar?.url || "#"}
                    sx={{
                        objectFit: 'contain',
                        bgcolor: theme.palette.secondary[400],
                        fontWeight: 600
                    }} />
            )
        }
    }, {
        field: "userName",
        headerName: lang.users.userName,
        width: 150,
        editable: false
    }, {
        field: "name",
        headerName: lang.users.name,
        width: 150,
        editable: true

    }, {
        field: "email",
        headerName: lang.users.email,
        width: 150,
        editable: true


    }, {
        field: "phone",
        headerName: lang.users.phone,
        width: 150,
        editable: true


    }, {
        field: "familyPhone",
        headerName: lang.users.familyPhone,
        width: 150,
        editable: true
    }, {
        field: "isActive",
        headerName: lang.users.isActive,
        type: "boolean",
        editable: true
    }, {
        field: "group",
        headerName: "group",
        filterable: false,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.isAdmin ? "admin" : params.row.group?.groupName ? params.row.group?.groupName : 'لم يسجل'}
                </Typography>
            )
        }
    },
    ]


    if (!exam || !attempts) return <LoaderSkeleton />

    return (
        <Box>
            <Header title={"exam statistics"} />

            <Box>
                <ExamStatisticsHeader
                    exam={exam}
                    attempts={attempts}
                    fetchStatistics={fetchStatistics} examStatistisc={examStatistisc} greaterThan={greaterThan} setGreaterThan={setGreaterThan} />
            </Box>
            <MakeTitle title={"Answered users"}> <VerifiedUserRoundedIcon color='success' sx={{ opacity: .9, fontWeight: 600 }} /> </MakeTitle>


            <Box
                sx={{ height: "70vh", width: '100%', bgcolor: theme.palette.background.alt }}
            >
                <DataGrid
                    sx={{ bgcolor: theme.palette.background.alt }}

                    columns={columns}
                    rows={attempts || []}
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

            <MakeTitle title={"Not answered users"}><DangerousRoundedIcon color='error' sx={{ opacity: .9, fontWeight: 600 }} />  </MakeTitle>
            {notAnsweredUsers ?
                <Box sx={{ height: '70vh' }}>
                    <DataGrid
                        columns={notAnsweredCol}
                        rows={notAnsweredUsers || []}
                        getRowId={row => row._id}
                        columnVisibilityModel={{
                            // Hide columns status and traderName, the other columns will remain visible
                            _id: false,
                        }}
                    />
                </Box> : <LoaderSkeleton />}
        </Box>
    )
}
