import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { DAYES } from '../constants/dateConstants'
import { buttonError, buttonStyle } from '../../styles/buttonsStyles'
import { useNavigate } from 'react-router-dom'
import { useDeleteGroupMutation } from '../../toolkit/apiSlice'
import usePostData from '../../hooks/usePostData'
import { useDispatch } from 'react-redux'
import { setGroups } from '../../toolkit/groupsSlice'

function GroupRow({ row, open }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sendData, { isLoading }] = useDeleteGroupMutation()
    const [deleteGroup] = usePostData(sendData)

    const trigger = async (group) => {
        await deleteGroup(group)
        dispatch(setGroups(null))
    }


    return (
        <TableRow>

            {/* nested table (collapsed) */}
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>

                        <Typography variant="h6" gutterBottom component="div">
                            grade groups
                        </Typography>

                        <Table size="small" aria-label="purchases">

                            <TableHead>
                                <TableRow>

                                    <TableCell>group name</TableCell>
                                    <TableCell>day</TableCell>
                                    <TableCell>Edit</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {row.groups && row.groups.map((group, i) => {

                                    // make it global
                                    const classicTime = (time) => {
                                        const inNum = Number(time)
                                        return (inNum) > 10 ? `${inNum}` : `${inNum}`
                                    }

                                    const showDay = (day) => {
                                        const time = day.time.split(":")[0]
                                        const min = day.time.split(":")[1]


                                        const shownTime = Number(time) > 12 ?
                                            `${classicTime(time - 12)}:${classicTime(min)} pm` :
                                            `${classicTime(Number(time))}:${classicTime(min)} am`

                                        return `${DAYES[day.dayIndex]} / ${shownTime} --->`
                                    }

                                    const groupStdNumbers = group.stdNumbers || 0

                                    return (
                                        <TableRow key={i}>

                                            <TableCell component="th" scope="row" align='left'> {group.groupName}</TableCell>

                                            <TableCell align='left'>
                                                {group.days && group.days.map(day => ` ${showDay(day)}`)} <br /> {groupStdNumbers} students
                                            </TableCell>

                                            <TableCell sx={{ display: "flex", justifyContent: 'center', gap: 1 }}>
                                                <Button onClick={() => navigate("/management/years/edit", { state: { group } })} sx={buttonStyle}>Edit</Button>
                                                <Button onClick={() => trigger(group)} sx={buttonError}>delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>

                        </Table>

                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default memo(GroupRow)
