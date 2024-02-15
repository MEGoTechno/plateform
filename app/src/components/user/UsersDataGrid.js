import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { addUser, updateUserState } from '../../toolkit/usersSlice';
import { user_roles } from '../constants/roles';
import { useUpdateUserMutation } from '../../toolkit/apiSlice';
import usePostData from '../../hooks/usePostData';
import { buttonStyle, sendSuccess } from '../styles/buttonsStyles';

export default function UsersDataGrid({ users, paginationModel, setPaginationModel, pageState }) {

    const { lang } = useSelector(s => s.global)
    const theme = useTheme()
    const dispatch = useDispatch()

    const [rows, setRows] = useState(users)

    useEffect(() => {
        setRows(users)
    }, [users])


    const [sendData, { isLoading }] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)

    // for editing settings #####
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };



    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {

        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row._id !== id));
    };


    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = rows.find((row) => row.id === id);
        // if (editedRow.isNew) {
        //     setRows(rows.filter((row) => row.id !== id));
        // }
    };




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
        headerName: "group",
        renderCell: (params) => {
            console.log(params.row)
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {params.row.isAdmin ? "admin" : params.row.group?.groupName ? params.row.group?.groupName : 'لم يسجل'}
                </Typography>
            )
        }
    }, {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: (params) => {
            const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(params.id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(params.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(params.id)}
                    color="inherit"
                />,
            ];
        },
    },
    ]

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {

        await updateUser(newRow)
        const updatedRow = { ...newRow, isNew: true };
        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        dispatch(updateUserState(newRow))
        return updatedRow;
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Grid container spacing={2}>
                    <Grid item>
                        <GridToolbarColumnsButton sx={buttonStyle} />
                    </Grid>
                    <Grid item>
                        <GridToolbarFilterButton sx={buttonStyle} />
                    </Grid>
                    <Grid item>
                        <GridToolbarDensitySelector sx={buttonStyle} />
                    </Grid>
                    <Grid item>
                        <GridToolbarExport sx={sendSuccess} />
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        );
    }

    return (
        <Box
            sx={{ height: "70vh", width: '100%', bgcolor: theme.palette.background.alt }}
        >
            <DataGrid
                sx={{ bgcolor: theme.palette.background.alt }}

                columns={columns}
                rows={rows || []}
                getRowId={row => row._id}
                loading={pageState.isLoading || isLoading || false}
                rowCount={pageState.rowCount} // ===> total for server (.length)
                pageSizeOptions={[5, 10, 50, 100]}

                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

                //for edit
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                editMode="row"

                slots={{
                    toolbar: CustomToolbar
                }}

                columnVisibilityModel={{
                    // Hide columns status and traderName, the other columns will remain visible
                    _id: false,
                }}
            />
        </Box>
    )
}
