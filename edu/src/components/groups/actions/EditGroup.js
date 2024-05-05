import { Avatar, Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import Header from '../../tools/Header'
import GroupForm from './GroupForm'
import * as Yup from "yup"
import Diversity1SharpIcon from '@mui/icons-material/Diversity1Sharp';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DAYES } from '../../constants/dateConstants'
import { useCreateGroupMutation, useUpdateGroupMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { useDispatch } from 'react-redux'
import { resetGroupsState } from '../../../toolkit/groupsSlice'


export default function EditGroup() {

    const theme = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const group = location.state?.group

    const daysFormat = useMemo(() =>

        DAYES.map((day, i) => {
            return { label: day, value: i }

        }), [])

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const [sendData] = useUpdateGroupMutation()
    const [updateGroup] = usePostData(sendData, formOptions, setFormOptions)

    if (!group) return <>not found</>


    const daySchema = {
        time: '',
        dayIndex: ''
    }

    const inputs = [
        {
            name: "_id",
            label: "...",
            value: group._id,
            hidden: true,
            disabled: true,
            validation: Yup.string().required()
        }, {
            name: "groupName",
            label: "group Name",
            value: group.groupName,
            validation: Yup.string().required("group name is required")
        }, {
            name: "days",
            type: 'array',
            add: daySchema,
            addLabel: "add day",
            value: group.days,
            removeLabel: "remove day",
            validation:
                Yup.array()
                    .of(
                        Yup.object().shape({
                            time: Yup.string().required('Required'),
                            dayIndex: Yup.number().required('choose day please!'),
                        })
                    )
                    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
                    .min(1, 'Minimum of 1 questions'),
            array: [
                {
                    name: 'time',
                    type: 'time',
                    label: "day time",
                }, {
                    name: "dayIndex",
                    type: 'select',
                    label: "day",
                    options: daysFormat
                }
            ]
        }
    ]

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })

        await updateGroup(formOptions.values)
        dispatch(resetGroupsState())
    }

    const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }


    return (
        <Box >
            <Header title={"edit group"} />
            <Grid align="center">

                <Paper elevation={1} style={paperStyle} >

                    <Avatar sx={avatarStyle}>
                        <Diversity1SharpIcon />
                    </Avatar>

                    <Typography>edit group</Typography>
                    <GroupForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
                </Paper>

            </Grid>
        </Box>
    )
}
