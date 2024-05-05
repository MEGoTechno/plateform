import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { Avatar, Box, Button, Typography, gridClasses } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import LoaderSkeleton from "../tools/LoaderSkeleton"
import Test from "./molecules/Test"
import { useEffect, useState } from "react"
import UsersDataGrid from "./UsersDataGrid"
import useLazyGetData from "../../hooks/useLazyGetData"
import { setUsers } from "../../toolkit/usersSlice"
import useGetUsers from "../../hooks/useGetUsers"
import { SuccessBtn, sendSuccess } from "../../styles/buttonsStyles"
import ModalControlled from "../tools/ModalControlled"
import AddUserPage from "./actions/AddUserPage"
import DialogControllled from "../tools/DialogControlled"
import MeDatagrid from "../tools/datagrid/MeDatagrid"
import { useUpdateUserMutation } from "../../toolkit/apis/UsersApi"
import usePostData from "../../hooks/usePostData"
import { user_roles } from "../constants/roles"


export default function GetUsers() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [isShowAddUser, setShowAddUser] = useState(false)

    const { lang } = useSelector(s => s.global)
    const { users } = useSelector(s => s.usersSettings)

    //fetching
    const [getUsers] = useGetUsers()

    //update
    const [sendData, { isLoading }] = useUpdateUserMutation()
    const [updateUserFC] = usePostData(sendData)

    const trigger = async (setPageState, paginationModel, sort, filter) => {
        const res = await getUsers(setPageState, paginationModel, sort, filter)
        dispatch(setUsers(res))
    }

    const updateUser = async (updatedUser) => {
        setLoading(true)
        const res = await updateUserFC(updatedUser)
        setLoading(false)
    }

    const columns = [{
        field: "_id",
        headerName: "id",
        disableExport: true,
    }, {
        field: "avatar",
        headerName: "صوره",
        disableExport: true,
        renderCell: (params) => {
            return (
                <Avatar alt={params.row.name.toUpperCase()} src={params.row?.avatar?.url || "#"}
                    sx={{
                        objectFit: 'contain',
                        bgcolor: theme.palette.success.main,
                        fontWeight: 600,
                        color: theme.palette.grey[0]
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
        field: "role",
        headerName: lang.users.role,
        type: 'singleSelect',
        valueOptions: [user_roles.SUBADMIN, user_roles.STUDENT],
        editable: true,
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.role ? params.row.role : "student"}
                </Typography>
            )
        }
    }, {
        field: "grade",
        headerName: lang.users.grade,
        type: 'singleSelect',
        valueOptions: [{ value: '30', label: 'name' }],
        renderCell: (params) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.isAdmin ? "admin" : params.row.grade?.gradeName}
                </Typography>
            )
        }
    }, {
        field: "group",
        headerName: lang.groups.groups,
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

    return (
        <Box >
            <Box
                sx={{ height: "70vh", width: '100%' }}
            >
                <SuccessBtn onClick={() => setShowAddUser(true)} sx={{ width: "auto" }}>
                    {lang.users.addUser}
                </SuccessBtn>

                <DialogControllled isOpen={isShowAddUser} setOpen={setShowAddUser} title={"Add user"}>
                    <AddUserPage />
                </DialogControllled>

                <Box
                    sx={{ height: "65vh", width: '100%', bgcolor: theme.palette.background.alt }}
                >
                    <MeDatagrid
                        loading={loading || isLoading || false}
                        type={"crud"}
                        rows={users}
                        columns={columns}
                        fetchFc={trigger}
                        updateFc={updateUser}
                        editing={
                            {
                                hideColumns: ["_id"],
                                bgColor: theme.palette.background.alt,
                                showSlots: ["density", "filter", "columns", "export"]
                            }
                        }
                    />
                </Box>
            </Box>
        </Box >
    )
}