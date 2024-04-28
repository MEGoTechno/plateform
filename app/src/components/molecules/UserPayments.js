import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


import { buttonStyle, sendSuccess } from '../../styles/buttonsStyles';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import GppBadIcon from '@mui/icons-material/GppBad';
import { useLazyGetPaymentsByGradeQuery } from '../../toolkit/apiSlice';
import usePostData from '../../hooks/usePostData';
import useLazyGetData from '../../hooks/useLazyGetData';
import { useUpdateUserMutation } from '../../toolkit/apis/UsersApi';

export default function UserPayments({ user, isManage }) {

    const [loading, setLoading] = useState(false)


    const [rows, setRows] = useState(null)
    const [payments, setPayments] = useState(null)

    const [getDataPayments] = useLazyGetPaymentsByGradeQuery()
    const [getPayments] = useLazyGetData(getDataPayments)

    const trigger = async () => {
        setLoading(true)

        const res = await getPayments(user.group.grade || user.group)
        setPayments(res)

        setLoading(false)
    }

    useEffect(() => {
        if (user) {
            trigger()
        }

    }, [user])

    useEffect(() => {

        if (payments?.length > 0 && user) {
            const modified = JSON.parse(JSON.stringify(payments))

            modified.map((payment) => {
                user.payments.includes(payment._id) ? payment.isPaid = true : payment.isPaid = false
                return payment
            })

            setRows(modified)
        }

    }, [payments, user])

    // get and modify payments

    const { lang } = useSelector(s => s.global)
    const theme = useTheme()

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

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };




    const columns = [{
        field: "_id",
        headerName: "id",
    }, {
        field: "paymentName",
        headerName: "payment name",
        width: 150,
    }, {
        field: "isPaid",
        headerName: "is payed",
        type: "boolean",
        editable: isManage,
        renderCell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "11px" }}>
                    {row.isPaid ? <ThumbUpAltIcon color='success' /> : <GppBadIcon color='error' />}
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
                />
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

        try {
            const updatedUser = await updateUser({ paymentId: newRow._id, _id: user._id })
            const updatedRow = { ...newRow, isPaid: updatedUser?.payments?.includes(newRow._id) };

            setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
            return updatedRow;

        } catch (error) {

            const updatedRow = { ...newRow, isPaid: false };
            setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));

            return updatedRow;
        }


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
                loading={isLoading || loading || false}
                pageSizeOptions={[5, 10, 50, 100]}

                //for edit
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                editMode="row"

                slots={{
                    toolbar: isManage && CustomToolbar
                }}

                columnVisibilityModel={{
                    // Hide columns status and traderName, the other columns will remain visible
                    _id: false,
                    actions: isManage

                }}
            />
        </Box>
    )
}
