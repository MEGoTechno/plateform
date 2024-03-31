import { useNavigate } from "react-router-dom"
import { useGetUsersQuery, useLazyGetUsersQuery } from "../../toolkit/apiSlice"
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
import { sendSuccess } from "../styles/buttonsStyles"
import ModalControlled from "../tools/ModalControlled"
import AddUserPage from "./actions/AddUserPage"
import DialogControllled from "../tools/DialogControlled"


export default function GetUsers() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const [isShowAddUser, setShowAddUser] = useState(false)

    const { users } = useSelector(s => s.usersSettings)
    // console.log(users)

    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const [getUsers] = useGetUsers(setPageState, paginationModel)


    const trigger = async () => {

        const res = await getUsers()
        dispatch(setUsers(res))
    }

    useEffect(() => {
        trigger()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationModel, paginationModel.page, paginationModel.pageSize])

    return (
        <Box >
            <Box
                sx={{ height: "70vh", width: '100%' }}
            >
                <Button onClick={() => setShowAddUser(true)} sx={sendSuccess} style={{ width: "auto" }}>add user</Button>

                <DialogControllled isOpen={isShowAddUser} setOpen={setShowAddUser} title={"Add user"}>
                    <AddUserPage />
                </DialogControllled>

                <UsersDataGrid
                    users={users}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    pageState={pageState}
                />

            </Box>
        </Box >
    )
}