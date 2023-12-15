import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentForm from './ContentForm'
import usePostData from '../../../../hooks/usePostData'
import * as Yup from "yup"
import { useUpdateLectureMutation } from '../../../../toolkit/apiSlice'
import { Box } from '@mui/material'
import Header from "../../../tools/Header"
import { useSelector } from 'react-redux'

export default function EditLecture() {
    const location = useLocation()
    const {lang} = useSelector(s => s.global)
    const lecture = location.state
    const [sendData] = useUpdateLectureMutation()

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
            name: "gradeId",
            label: "...",
            value: lecture.gradeId,
            hidden: true,
            disabled: true
        }, {
            name: "gradeName",
            label: lang.form.gradeName,
            value: lecture.gradeName,
            validation: Yup.string().required("you should write the new one"),
            disabled: true
        }, {
            name: "unitId",
            label: "...",
            value: lecture.unitId,
            hidden: true,
            disabled: true,
        }, {
            name: "unitName",
            label: lang.form.unitName,
            value: lecture.unitName,
            disabled: true
        }, {
            name: "lessonId",
            label: "...",
            value: lecture.lessonId,
            hidden: true,
            disabled: true,
        }, {
            name: "lessonName",
            label: lang.form.lessonName,
            value: lecture.lessonName,
            disabled: true,
        }, {
            name: "partId",
            label: "...",
            value: lecture.partId,
            hidden: true,
            disabled: true,
        }, {
            name: "partName",
            label: lang.form.partName,
            value: lecture.partName,

        }, {
            name: "description",
            label: lang.form.description,
            value: lecture.description,
        }, {
            name: "thumbnail",
            label: lang.form.thumbnail,
            type: "file",
            existedFile: lecture.thumbnail
        }, {
            name: "video",
            label: lang.form.video,
            type: "file",
            existedFile: lecture.video
        }
    ]

    const [trigger] = usePostData(sendData, formOptions, setFormOptions)

    const sumbitData = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })

        const res = await trigger()
        console.log(res)

    }

    return (
        <Box sx={{direction: lang.direction}}>
            <Header title={lang.content.editLecture} description={`${lecture.gradeName} > ${lecture.lessonName} > ${lecture.partName}`} />
            <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={sumbitData} />
        </Box>
    )
}