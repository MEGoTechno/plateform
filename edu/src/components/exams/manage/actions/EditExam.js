import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import * as Yup from "yup"
import ExamForm from './ExamForm'
import Header from '../../../tools/Header'

import { useUpdateExamMutation } from '../../../../toolkit/apiSlice'
import usePostData from '../../../../hooks/usePostData'

import { setExams } from '../../../../toolkit/examSlice'

import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'


export default function EditExam() {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { lang } = useSelector(s => s.global)

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const exam = location.state
    const { grade: gradeId, unitName, unitId, lessonName, lessonId, partName, partId, description, questions, time,
        isActive, attemptsNums, dateStart, dateEnd, isShowAnswers } = exam

    const questionSchema = {
        title: "",
        hints: "",
        image: "",
        rtOptionId: "",
        points: 5,
        options: [
            {
                id: uuidv4(),
                title: ""
            }, {
                id: uuidv4(),
                title: ""
            }, {
                id: uuidv4(),
                title: ""
            }, {
                id: uuidv4(),
                title: ""
            }
        ]
    }

    const inputs = [
        {
            name: "partId",
            label: "partId",
            value: partId,
            hidden: true,
            disabled: true,
            type: "hidden"
        }, {
            name: "grade",
            label: "gradeId",
            value: gradeId,
            hidden: true,
            disabled: true
        }, {
            name: "unitId",
            label: "unitId",
            value: unitId,
            hidden: true,
            disabled: true,
        }, {
            name: "unitName",
            label: lang.form.unitName,
            value: unitName || "",
            disabled: unitName ? true : false,
            validation: Yup.string().required("مطلوب")

        }, {
            name: "lessonId",
            label: "lessonId",
            value: lessonId,
            hidden: true,
            disabled: true
        }, {
            name: "lessonName",
            label: lang.form.lessonName,
            value: lessonName || "",
            disabled: lessonName ? true : false,
            validation: Yup.string().required("مطلوب")

        }, {
            name: "attemptsNums",
            label: "attempts numbers",
            type: 'number',
            value: attemptsNums,
            validation: Yup.string().required("مطلوب")
        }, {
            name: "dateStart",
            label: "start date",
            variant: "standard",
            type: 'fullDate',
            value: dayjs(dateStart),
        }, {
            name: "dateEnd",
            label: "end date",
            variant: "standard",
            type: 'fullDate',
            value: dayjs(dateEnd),
        }, {
            name: "isActive",
            label: "is active",
            type: 'radio',
            options: [{ value: true, label: 'active' }, { value: false, label: "not active" }],
            value: isActive,
            validation: Yup.boolean().required("مطلوب")
        }, {
            name: "isShowAnswers",
            label: "is show answers",
            type: 'radio',
            options: [{ value: true, label: 'active' }, { value: false, label: "not active" }],
            value: isShowAnswers,
            validation: Yup.boolean().required("مطلوب")
        }, {
            name: "partName",
            label: lang.form.partName,
            value: partName || "",
            variant: "standard",
            validation: Yup.string().required("مطلوب")
        }, {
            name: "description",
            value: description || "",
            label: lang.form.description,
            variant: "standard"
        }, {
            name: "time",
            value: time / 60,
            type: "number",
            label: "time",
        }, {
            name: "questions",
            label: "question ==>",
            value: questions,
            add: questionSchema,
            addLabel: "add question",
            removeLabel: "remove question",
            validation:
                Yup.array()
                    .of(
                        Yup.object().shape({
                            title: Yup.string().required('Required'),
                            rtOptionId: Yup.string().required('choose right question!'),
                            options: Yup.array().of(
                                Yup.object().shape({
                                    title: Yup.string().required('Required'),
                                })
                            )
                        })
                    )
                    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
                    .min(2, 'Minimum of 3 questions')
            ,
            type: "chunk",
            array: [
                {
                    name: "title",
                    label: "title",
                }, {
                    name: "hints",
                    label: "hints",
                }, {
                    name: "rtOptionId",
                    label: "right option",
                    disabled: true,
                    hidden: true
                }, {
                    name: "image",
                    label: "insert image",
                    type: "file",
                    disabled: true
                }, {
                    name: "points",
                    label: "poitns",
                    type: "number"
                }, {
                    title: "options",
                    type: "header"
                }, {
                    name: "options",
                    type: "array",
                    value: [],
                    array: [
                        {
                            name: "id",
                            label: "...",
                            disabled: true,
                            hidden: true,
                        }, {
                            name: "title",
                            label: "answer",
                            choose: "rtOptionId",
                            from: 'id'
                        }
                    ]
                }

            ]
        }
    ]

    const [sendData] = useUpdateExamMutation()
    const [updateExam] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions(pre => {
            return {
                ...pre, isLoading: true, isShowModal: false
            }
        })
        await updateExam(formOptions.values)
        dispatch(setExams(null))
        // navigate("/management/exams", { replace: true })
    }

    return (
        <Box>
            <Header title={"edit exam"} />
            <ExamForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
