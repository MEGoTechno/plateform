import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { buttonStyle, sendSuccess } from '../../../styles/buttonsStyles';

function CrudDatagrid({ rows, columns, editing, fetchFc, loading, updateFc, deleteFc }) {


    const [filter, setFilter] = useState()
    const [sort, setSort] = useState()

    // for pagination settings
    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // filtering
    const onFilterChange = React.useCallback((filterModel) => {

        const filtered = {}
        filterModel?.items.map((item) => {
            filtered[item.field] = item.value || ""
            return filtered
        })
        setFilter(filtered)
    }, []);

    // for sorting
    const handleSortModelChange = React.useCallback((sortModel) => {
        if (sortModel.length > 0) {
            setSort({
                sortkey: sortModel[0].field,
                sortvalue: sortModel[0].sort
            })
        }
    }, []);




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
        // setRows(rows.filter((row) => row._id !== id));
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

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {

        const updatedRow = { ...newRow, isNew: true };
        await updateFc(newRow)
        // setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        return updatedRow;
    };

    const modeifiedColmns = useMemo(() => {
        return [...columns, {
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
        }]
    }, [columns, rowModesModel])

    // running main fc in  changing
    useEffect(() => {

        fetchFc(setPageState, paginationModel, sort, filter)

    }, [paginationModel.page, paginationModel.pageSize, sort, filter])


    // hide columns 
    const hideColumns = useMemo(() => {
        const inVisibleModels = {}
        editing.hideColumns.map(ele => inVisibleModels[ele] = false)
        return inVisibleModels

    }, [editing.hideColumns])


    // slots
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Grid container spacing={2}>
                    {
                        editing.showSlots.includes("columns") &&
                        <Grid item>
                            <GridToolbarColumnsButton sx={buttonStyle} />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("filter") &&
                        <Grid item>
                            <GridToolbarFilterButton sx={buttonStyle} />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("density") &&
                        <Grid item>
                            <GridToolbarDensitySelector sx={buttonStyle} />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("export") &&
                        <Grid item>
                            <GridToolbarExport sx={sendSuccess} />
                        </Grid>
                    }
                </Grid>
            </GridToolbarContainer>
        );
    }
    return (
        <DataGrid
            rows={rows || []}
            columns={modeifiedColmns}
            loading={pageState.isLoading || loading || false}
            rowCount={pageState.rowCount} // ===> total for server (.length)
            getRowId={(param) => param._id}

            pageSizeOptions={[5, 10, 50, 100]}

            // for pagination
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

            // for search
            onFilterModelChange={onFilterChange}

            //for sorting
            sortingMode="server"
            onSortModelChange={handleSortModelChange}

            //for edit
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(err) => console.log(err)}
            editMode="row"


            //slots
            slots={{
                toolbar: CustomToolbar
            }}
            
            // Hide columns status and traderName, the other columns will remain visible
            columnVisibilityModel={hideColumns}
            sx={{
                bgcolor: editing.bgColor
            }}
        />

    )
}

export default CrudDatagrid
