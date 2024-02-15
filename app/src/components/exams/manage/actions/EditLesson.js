import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { useUpdateExamMutation } from '../../../../toolkit/apiSlice'
import usePostData from '../../../../hooks/usePostData'
import { setExams } from '../../../../toolkit/examSlice'
import ExamForm from './ExamForm'
import { Box } from '@mui/material'

export default function EditLesson() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { changeKey, by, value, id } = location.state

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const inputs = [
        {
            name: by,
            label: "...",
            value: id,
            hidden: true,
            disabled: true
        }, {
            name: changeKey,
            label: 'new ' + changeKey,
            value: value || "",
            validation: Yup.string().required("you should write the new one")
        }
    ]

    const [updateName] = useUpdateExamMutation()
    const [sendName] = usePostData(updateName, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isShowModal: false, isLoading: true
        })
        await sendName(formOptions.values)
        dispatch(setExams(null))
        navigate("/management/exams")
    }
    return (
        <Box sx={{mt: "20px"}}>
            <ExamForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
