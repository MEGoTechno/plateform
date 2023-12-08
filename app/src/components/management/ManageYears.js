import React, { useEffect, useState } from 'react'
import { Alert, Box, } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddYear from './AddYear'
import LoaderSkeleton from "../tools/LoaderSkeleton"
import ButtonStyled from '../tools/ButtonStyled'
import { useDispatch, useSelector } from 'react-redux'
import { setGrades } from '../../toolkit/globalSlice'
import { useLazyGetSettingsQuery } from '../../toolkit/apiSlice'

export default function ManageYears() {
    // get grades and store it
    const dispatch = useDispatch()
    const { grades } = useSelector(s => s.global) // null
    const [trigger, { data: gradesFromDB, isSuccess, isLoading }] = useLazyGetSettingsQuery()

    useEffect(() => {
        if (!grades) {
            getGrades()
        }
    }, [gradesFromDB, grades])

    const getGrades = async () => {
        try {
            trigger()
            if (gradesFromDB && isSuccess) {
                dispatch(setGrades(gradesFromDB))
            }
        } catch (err) {
            setAlert({ state: true, message: err.message })
        }
    }

    // alert if errors for add year
    const [alert, setAlert] = useState({
        state: false,
        message: ""
    })

    // open add year component
    const [isAddYear, setAddYear] = useState(false)
    const action = () => {
        setAddYear(!isAddYear)
    }

    const column = [{
        field: "gradeName",
        headerName: "grade",
        width: 150
    }]

    return (
        <Box>
            {isLoading ? ( // if loading...
                <LoaderSkeleton />
            ) : grades ? ( // there is data
                <DataGrid columns={column} rows={grades || []} getRowId={row => row.gradeId} />
            ) : ( // error 
                <Alert severity='error'>you have to set grade</Alert>
            )}
            <Box display="flex" justifyContent="center">
                <ButtonStyled title={!isAddYear ? "add year" : "close"} action={action} />
            </Box>
            {isAddYear && <AddYear grades={grades} setAlert={setAlert} />}
            {alert.state && <Alert severity={alert.state}>{alert.message}</Alert>}
        </Box>
    )
}
