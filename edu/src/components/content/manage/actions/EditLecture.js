import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ContentForm from './ContentForm'
import usePostData from '../../../../hooks/usePostData'
import * as Yup from "yup"
import { Box } from '@mui/material'
import Header from "../../../tools/Header"
import { useDispatch, useSelector } from 'react-redux'
import { setLectures } from '../../../../toolkit/lecturesSlice'
import { useUpdateLectureMutation } from '../../../../toolkit/apis/lecturesApi'

export default function EditLecture() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { lang } = useSelector(s => s.global)
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
            name: "grade",
            label: "...",
            value: lecture.grade,
            hidden: true,
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
            disabled: true,
            validation: Yup.string().required("مطلوب")
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
            validation: Yup.string().required("مطلوب")
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
            validation: Yup.string().required("مطلوب")

        }, {
            name: "description",
            label: lang.form.description,
            value: lecture.description,
            validation: Yup.string().required("مطلوب")
        }, {
            name: "thumbnail",
            label: lang.form.thumbnail,
            type: "file",
            value: lecture.thumbnail,
            validation: Yup.mixed().required(lang.errors.requireImg)
                .test({
                    message: 'Please provide a supported image typed(jpg or png)',
                    test: (file, context) => {
                        const isType = file?.type ? file?.type : `${file.resource_type}/${file.format}`
                        const isValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(isType);
                        if (!isValid) context?.createError();
                        return isValid;
                    }
                })
                .test({
                    message: lang.errors.less15mg,
                    test: (file) => {
                        const isValid = file?.size < 15 * 1000000;
                        return isValid;
                    }
                })
        }, {
            name: "video",
            label: lang.form.video,
            type: "file",
            value: lecture.video,
            validation: Yup.mixed().required(lang.errors.requireVid)
                .test({
                    message: 'Please provide a supported video typed(mp4)',
                    test: (file, context) => {
                        const isType = file?.type ? file?.type : `${file.resource_type}/${file.format}`
                        const isValid = ['video/mp4'].includes(isType);
                        if (!isValid) context?.createError();
                        return isValid;
                    }
                })
                .test({
                    message: lang.errors.less15mg,
                    test: (file) => {
                        const isValid = file?.size < 15 * 1000000;
                        return isValid;
                    }
                })
        }
    ]

    const [trigger] = usePostData(sendData, formOptions, setFormOptions)

    const sumbitData = async () => {
        console.log(formOptions.values)
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await trigger(formOptions.values, "multi")
        dispatch(setLectures(null))
        navigate("/management/lectures")
    }

    return (
        <Box sx={{ direction: lang.direction }}>
            <Header title={lang.content.editLecture} description={`${lecture.gradeName} > ${lecture.lessonName} > ${lecture.partName}`} />
            <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={sumbitData} />
        </Box>
    )
}