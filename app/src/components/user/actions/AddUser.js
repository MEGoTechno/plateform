import React, { useEffect, useMemo, useState } from 'react'
import { useAddUserMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { Avatar, Box, Grid, Paper, useTheme } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../../toolkit/usersSlice'
import { useNavigate } from 'react-router-dom'
import UserForm from './UserForm'
import * as Yup from "yup"
import useGetGrades from '../../../hooks/useGetGrades';
import LoaderSkeleton from '../../tools/LoaderSkeleton';

export default function Adduser({ groups, grades }) {
    const navigate = useNavigate()
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const dispatch = useDispatch()

    const [formOptions, setFormOptions] = useState({ // if not modal use only 2 compose (default 3)
        isLoading: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "",
        values: null,
        getData: null
    })
    const modifiedGrades = useMemo(() => grades.map(grade => { return { value: grade?._id, label: grade.gradeName, gradeId: grade._id } }), [grades])
    const modifiedGroups = useMemo(() => groups.map(group => { return { value: group?._id, label: group.groupName, grade: group.grade } }), [groups])

    console.log(modifiedGroups)
    const [sendData] = useAddUserMutation()
    const [sendAdd] = usePostData(sendData, formOptions, setFormOptions)

    const inputs = [{
        name: "name",
        label: lang.users.name,
        validation: Yup.string().required("name is required")
    }, {
        name: "userName",
        label: lang.users.userName,
        validation: Yup.string().required("user name should be unique")
    }, {
        name: "email",
        label: lang.users.email,
        validation: Yup.string().required()
    }, {
        name: "phone",
        label: lang.users.phone,
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "familyPhone",
        label: lang.users.familyPhone,
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "password",
        label: lang.users.password,
        type: "password",
        validation: Yup.string().required("password is required").min(6, "should be at least 6 characters"),
    }, {
        name: "grade",
        label: lang.users.chooseGrade,
        type: "radio",
        options: modifiedGrades,
        validation: Yup.string().required("required")
    }, {
        name: "group",
        label: "group",
        type: "selectRef",
        ref: "grade",
        options: modifiedGroups,
        message: "choose grade please to choose group for that"
    }]

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isShowModal: false, isLoading: true
        })
        const res = await sendAdd()
        dispatch(addUser(res))
        // navigate(-1)
    }

    const paperStyle = { padding: 20, width: "100%", margin: "20px auto", backgroundColor: theme.palette.background.alt }
    const avatarStyle = { backgroundColor: theme.palette.secondary[500], margin: "10px 0" }

    return (

        <Box width="100%" sx={{ direction: lang.direction }}>
            <Box display="flex" justifyContent="center" width="100%" >
                <Grid >
                    <Paper elevation={1} style={paperStyle} >
                        <Grid align="center">
                            <Avatar sx={avatarStyle}><PersonAddAltIcon /></Avatar>
                            <h4>{lang.logo}</h4>
                        </Grid>

                        <UserForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
                    </Paper>
                </Grid>
            </Box>
        </Box>
    )
}
