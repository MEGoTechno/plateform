import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentForm from './ContentForm'
import usePostData from '../../../../hooks/usePostData'
import * as Yup from "yup"
import { useUpdateLectureMutation } from '../../../../toolkit/apiSlice'

export default function EditLecture() {
    const location = useLocation()
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
            label: "grade name",
            value: lecture.gradeName,
            validation: Yup.string().required("you should write the new one"),
            disabled: true
        }, {
            name: "unitId",
            label: "...",
            value: lecture.UnitId,
            hidden: true,
            disabled: true,
        }, {
            name: "unitName",
            label: "unit name",
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
            label: "lesson name",
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
            label: "part name",
            value: lecture.partName,

        }, {
            name: "description",
            label: "description",
            value: lecture.description,
        }
    ]

    const [trigger] = usePostData(sendData, formOptions, setFormOptions)

    const sumbitData = () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })

        trigger()
    }

    return (
        <div>
            <ContentForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={sumbitData} />
        </div>
    )
}