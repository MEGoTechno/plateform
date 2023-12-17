import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "../../toolkit/apiSlice"
import { useTheme } from "@emotion/react"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import LoaderSkeleton from "../tools/LoaderSkeleton"


export default function GetUsers({ users }) {
    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()
    const theme = useTheme()


    const columns = [{
        field: "_id",
        headerName: "صوره",
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
        width: 150
    }, {
        field: "name",
        headerName: lang.users.name,
        width: 150

    }, {
        field: "email",
        headerName: lang.users.email,
        width: 150

    }, {
        field: "phone",
        headerName: lang.users.phone,
        width: 150

    }, {
        field: "isActive",
        headerName: lang.users.isActive,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.isActive ? lang.users.isActive : lang.users.notActive}
                </Typography>
            )
        }
    }, {
        field: "role",
        headerName: lang.users.role,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.role ? params.row.role : false}
                </Typography>
            )
        }
    }, {
        field: "grade",
        headerName: lang.users.grade,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.isAdmin ? "admin" : params.row.grade.gradeName}
                </Typography>
            )
        }
    }, {
        field: "action",
        headerName: lang.users.action,
        width: 200,
        renderCell: (params) => {
            return (
                <Box sx={{ mr: 5, width: "fit-content" }}>
                    <Button onClick={() => navigate("/users/" + params.row._id)} sx={{
                        color: theme.palette.secondary[400],
                        "&:hover": {
                            color: theme.palette.primary[400], bgcolor: theme.palette.secondary[400]
                        }
                    }}>
                        {lang.users.showProfile}
                    </Button>
                </Box>
            )
        }
    }]

    return (
        <Box >
            <Box
                sx={{ height: "70vh", width: '100%' }}
            >
                <DataGrid columns={columns} rows={users || []} getRowId={row => row._id} />
            </Box>
        </Box >
    )
}