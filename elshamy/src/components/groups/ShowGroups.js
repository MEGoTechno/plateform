import React, { memo, useState } from 'react'

import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { DAYES } from '../constants/dateConstants';
import { buttonError, buttonStyle, sendSuccess } from '../styles/buttonsStyles';
import GroupRow from './GroupRow';
import { useNavigate } from 'react-router-dom';
import { useDeleteGradeMutation } from '../../toolkit/apiSlice';
import usePostData from '../../hooks/usePostData';
import Loader from '../tools/Loader';
import { useDispatch } from 'react-redux';
import { resetGroupsState } from '../../toolkit/groupsSlice';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const [settings, setSettings] = useState({
        isLoading: false
    })

    const [sendData] = useDeleteGradeMutation()
    const [deleteGrade] = usePostData(sendData, settings, setSettings)

    const trigger = async (grade) => {
        setSettings({
            isLoading: true
        })
        await deleteGrade(grade)
        dispatch(resetGroupsState())
    }

    const navigate = useNavigate()
    const theme = useTheme()

    const stdNumbers = row.groups?.reduce((acc, group) => { return acc += group.stdNumbers }, 0) || 0

    return (
        <React.Fragment>

            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row" align='center'>
                    {row.gradeName}
                </TableCell>

                <TableCell align='center'>{row?.groups?.length || 0}</TableCell>
                <TableCell align='center'>{stdNumbers}</TableCell>
                <TableCell>

                    <Button onClick={() => navigate("/management/years/add", { state: { id: row._id } })}
                        disabled={settings.isLoading}
                        sx={sendSuccess}>
                        {settings.isLoading ? <Loader /> : "Add"}
                    </Button>
                    
                </TableCell>

            </TableRow>

            {(row?.groups?.length > 0) ? <GroupRow row={row} open={open} /> : (
                <TableRow>

                    {/* nested table (collapsed) */}
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, textAlign: 'center' }}>
                                No groups for this year
                            </Box>
                            
                            {/* <Box sx={{ margin: 1, textAlign: 'center' }}>

                                <Button onClick={() => trigger(row)}
                                    disabled={settings.isLoading}
                                    sx={buttonError}
                                    style={{ width: 'auto' }}
                                >
                                    {settings.isLoading ? <Loader /> : "remove grade"}
                                </Button>
                            </Box> */}

                        </Collapse>
                    </TableCell>
                </TableRow>
            )
            }

        </React.Fragment >
    );
}


function ShowGroups({ grades }) {
    const theme = useTheme()

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" >
                <TableHead>

                    <TableRow>
                        <TableCell />
                        <TableCell align='center'>grades & groups</TableCell>
                        <TableCell align="center">groups</TableCell>
                        <TableCell align="center">students number</TableCell>
                        <TableCell align="center">add</TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>
                    {grades.map((row, i) => (
                        <Row key={i} row={row} />
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default memo(ShowGroups)
