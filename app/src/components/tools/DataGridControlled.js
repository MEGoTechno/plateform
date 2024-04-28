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
import usePostData from '../../hooks/usePostData';
import { buttonStyle, sendSuccess } from '../styles/buttonsStyles';

export default function DataGridControlled({ data, columns, editFc, paginationModel, setPaginationModel, pageState }) {

    const { lang } = useSelector(s => s.global)
    const theme = useTheme()
    const dispatch = useDispatch()

    const [rows, setRows] = useState(data)

    useEffect(() => {
        setRows(data)
    }, [data])


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
    };



    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {

        await editFc(newRow)
        const updatedRow = { ...newRow, isNew: true };
        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
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
                loading={pageState.isLoading || false}
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

