import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'

export default function SimpleDatagrid({ rows, columns, loading }) {


    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(param) => param._id}

            pageSizeOptions={[5, 10, 50, 100]}
        />
    )
}
