import { Box, Button } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import FormControlled from '../../../tools/FormControlled'
// import ExamForm from '../../ExamForm'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../tools/Header'

import { usePostNewExamMutation } from '../../../../toolkit/apiSlice'
import usePostData from '../../../../hooks/usePostData'
import { setExams } from '../../../../toolkit/examSlice'

import * as Yup from "yup"
import ExamForm from './ExamForm'

import { v4 as uuidv4 } from 'uuid'






export default function CreateExam() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
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

    const { gradeId, unitId, unitName, lessonId, lessonName } = location.state

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

    const optionSchema = [
        {
            id: uuidv4(),
            title: ""
        }
    ]


    const inputs = [
        {
            name: "partId",
            label: "partId",
            value: uuidv4(),
            hidden: true,
            disabled: true
        }, {
            name: "grade",
            label: "gradeId",
            value: gradeId,
            hidden: true,
            disabled: true
        }, {
            name: "unitId",
            label: "unitId",
            value: unitId || uuidv4(),
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
            value: lessonId || uuidv4(),
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
            value: 1,
            validation: Yup.string().required("مطلوب")
        },{
            name: "dateStart",
            label: "start date",
            type: 'fullDate',
            value: null,
        },{
            name: "dateEnd",
            label: "inactivate date",
            type: 'fullDate',
            value: null,
        },{
            name: "isActive",
            label: "is active",
            type: 'radio',
            options: [{value: true, label: 'active'}, {value: false, label: "not active"}],
            value: true,
            validation: Yup.boolean().required("مطلوب")
        },{
            name: "isShowAnswers",
            label: "is show answers",
            type: 'radio',
            options: [{value: true, label: 'active'}, {value: false, label: "not active"}],
            value: true,
            validation: Yup.boolean().required("مطلوب")
        }, {
            name: "partName",
            label: lang.form.partName,
            validation: Yup.string().required("مطلوب")
        }, {
            name: "description",
            label: lang.form.description,
        }, {
            name: "time",
            value: 15,
            type: "number",
            label: "time",
        }, {
            name: "questions",
            label: "question ==>",
            value: [],
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
                    name: "image",
                    label: "insert image",
                    type: "file",
                    disabled: true
                }, {
                    name: "points",
                    label: "poitns",
                    type: "number"
                }, {
                    type: 'header',
                    title: 'options'
                }, {
                    name: "options",
                    type: "array",
                    value: [],
                    add: optionSchema,
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
                }, {
                    name: "rtOptionId",
                    label: "right option",
                    disabled: true,
                    hidden: true
                }

            ]
        }
    ]

    const [sendData] = usePostNewExamMutation()
    const [sendExams] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await sendExams(formOptions.values)
        dispatch(setExams(null))
        navigate("/management/exams", { replace: true })
    }
    return (
        <Box>
            <Header title={lang.exams.addExam} />
            <ExamForm inputs={inputs} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
