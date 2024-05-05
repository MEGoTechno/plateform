import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ContentForm from './ContentForm'
import usePostData from '../../../../hooks/usePostData'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { setLectures } from '../../../../toolkit/lecturesSlice'
import { Box } from '@mui/material'
import { useUpdateLectureMutation } from '../../../../toolkit/apis/lecturesApi'

export default function EditName() {
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

    // changeKey: unitName, lessonName, partName ## by: unitId ... ## id: g1u1, ...
    // {idKey, idName}
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

    const [sendData] = useUpdateLectureMutation()
    const [sendName] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isShowModal:false, isLoading: true
        })
        await sendName(formOptions.values)
        dispatch(setLectures(null))
        navigate("/management/lectures")
    }

    return (
        <Box sx={{mt: "20px"}}>
            <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}

