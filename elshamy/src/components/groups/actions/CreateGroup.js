import { Avatar, Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import Header from '../../tools/Header'
import GroupForm from './GroupForm'
import * as Yup from "yup"
import Diversity1SharpIcon from '@mui/icons-material/Diversity1Sharp';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DAYES } from '../../constants/dateConstants'
import { useCreateGroupMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { useDispatch } from 'react-redux'
import { resetGroupsState } from '../../../toolkit/groupsSlice'


export default function CreateGroup() {

    const theme = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const id = location.state?.id

    const daysFormat = useMemo(() =>
        DAYES.map((day, i) => {
            console.log("running ...")
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

    const [sendData] = useCreateGroupMutation()
    const [createGroup] = usePostData(sendData, formOptions, setFormOptions)



    const daySchema = {
        time: '',
        dayIndex: ''
    }

    const inputs = [
        {
            name: "grade",
            label: "...",
            value: id,
            hidden: true,
            disabled: "",
            validation: Yup.string().required()
        }, {
            name: "groupName",
            label: "group Name",
            validation: Yup.string().required("group name is required")
        }, {
            name: "days",
            type: 'array',
            add: daySchema,
            addLabel: "add day",
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

        await createGroup(formOptions.values)
        dispatch(resetGroupsState())
        navigate("/management/years")
    }

    const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }

    if (!id) return <>not found</>

    return (
        <Box >
            <Header title={"add group"} />
            <Grid align="center">

                <Paper elevation={1} style={paperStyle} >

                    <Avatar sx={avatarStyle}>
                        <Diversity1SharpIcon />
                    </Avatar>

                    <Typography>add group</Typography>
                    <GroupForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
                </Paper>

            </Grid>
        </Box>
    )
}
