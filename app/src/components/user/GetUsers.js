import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "../../toolkit/apiSlice"
import { useTheme } from "@emotion/react"
import { Box, Button, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import LoaderSkeleton from "../tools/LoaderSkeleton"


export default function GetUsers({ users }) {
    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()
    const theme = useTheme()


    const columns = [{
        field: "_id",
        headerName: "id",
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
        field: "isAdmin",
        headerName: lang.users.role,

    }, {
        field: "isActive",
        headerName: "is active",

    }, {
        field: "grade",
        headerName: lang.users.grade,
        renderCell: (params) => {
            return (
                <Typography>
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
                    <Button color="warning">edit</Button>
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