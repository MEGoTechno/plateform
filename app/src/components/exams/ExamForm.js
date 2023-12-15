import { Alert, Box, Button, TextField, useTheme } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ButtonStyled from '../tools/ButtonStyled'
import { useDispatch, useSelector } from 'react-redux'
import { addExamToCreated, addQuestionAction, chooseOptionAction, editOptionAction, editQuestionAction, removeQuestionAction, resetExamState } from '../../toolkit/examSlice'
import { usePostNewExamMutation } from '../../toolkit/apiSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../tools/Loader'

export default function ExamForm({ exam }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modifiedexam, setExam] = useState(exam)

    const { lang } = useSelector(s => s.global)
    const [sendData] = usePostNewExamMutation()
    const [loading, setLoading] = useState(false)
    // alert if errors for add year
    const [alert, setAlert] = useState({
        state: false,
        message: ""
    })
    const questions = exam.questions
    // console.log(exam.lessonName && "false")
    // console.log(exam)
    // const { questions } = useSelector(s => s.exam)
    const newQuestion = {
        id: exam.partId + `q${questions.length + 1}` || exam.partId + "q1", // grade + unit + lesson + part + question
        title: "",
        hints: "",
        rtOptionId: "",
        points: "",
        options: [{
            id: `${exam.partId}q${questions.length + 1}o1` || exam.partId + "q1o1", // grade + unit + lesson + part + question + option
            title: "",
        }, {
            id: `${exam.partId}q${questions.length + 1}o2` || exam.partId + "q1o2", // grade + unit + lesson + part + question + option
            title: "",
        }, {
            id: `${exam.partId}q${questions.length + 1}o3` || exam.partId + "q1o3", // grade + unit + lesson + part + question + option
            title: "",
        }, {
            id: `${exam.partId}q${questions.length + 1}o4` || exam.partId + "q1o4", // grade + unit + lesson + part + question + option
            title: "",
        }]
    }

    const inputStyle = {
        margin: "10px 0", color: theme.palette.secondary[500], "&:focus": {
            color: theme.palette.secondary[500],
            backgroundColor: theme.palette.secondary[500],
        }
    }

    const buttonStyle = {
        fontWeight: 600,
        margin: "10px 0", color: theme.palette.primary[500], bgcolor: theme.palette.success.main,
        "&:hover": {
            bgcolor: theme.palette.success.light
        }
    }

    const inputs = [{ // for exam settings
        label: "gradeId",
        id: "gradeId",
        name: "gradeId",
        hidden: true,
    }, {
        label: "unitId",
        id: "unitId",
        name: "unitId",
        hidden: true

    }, {
        label: "lessonId",
        id: "lessonId",
        name: "lessonId",
        hidden: true

    }, {
        label: "partId",
        id: "partId",
        name: "partId",
        hidden: true

    }, {
        label: lang.form.gradeName,
        id: "gradeName",
        name: "grade",
        title: exam.gradeName ? exam.gradeName : undefined,
        disabled: true,
        value: exam.gradeName
    }, {
        label: lang.form.unitName,
        id: "unitName",
        name: "unitName",
        title: exam.unitName ? exam.unitName : undefined,
        disabled: exam.unitName ? true : false,
        value: exam.unitName ? exam.unitName : undefined
    }, {
        label: lang.form.lessonName,
        id: "lessonName",
        name: "lessonName",
        title: exam.lessonName ? exam.lessonName : undefined,
        disabled: exam.lessonName ? true : false,
        value: exam.lessonName ? exam.lessonName : undefined
    }, {
        label: lang.form.partName,
        id: "partName",
        name: "partName",
        title: "part name",
        value: exam.partName ? exam.partName : undefined
    }, {
        label: lang.form.description,
        id: "description",
        name: "description",
        title: exam.description ? exam.description : undefined,
        value: exam.description ? exam.description : undefined
    }, {
        label: lang.form.degree,
        id: "degree",
        name: "degree",
        title: exam.degree ? exam.degree : undefined,
        value: exam.degree ? exam.degree : undefined

    }, {
        label: lang.form.time,
        id: "time",
        name: "time",
        title: exam.time ? exam.time : undefined,
        value: exam.time ? exam.time : undefined
    }]
    const handleExam = (input) => {
        const { id, value } = input
        setExam({
            ...modifiedexam, [id]: value
        })
    }
    const handleQuestions = (input, i) => {
        dispatch(editQuestionAction({ value: input.value, i }))
    }
    const handleOptions = (input, i, o) => {
        dispatch(editOptionAction({ value: input.value, i, o }))
    }
    const addQuestion = () => {
        dispatch(addQuestionAction(newQuestion))
        return questions
    }
    const removeQuestion = () => {
        dispatch(removeQuestionAction())
    }
    const chooseRtQuestion = (optionInfo) => { // {id, i = q, o = option}
        dispatch(chooseOptionAction(optionInfo))
    }

    const submit = () => {
        // set load ...
        const newExam = { ...modifiedexam, questions: questions }
        setLoading(true)

        sendData(newExam).then((res) => {
            if (res.data) {
                setLoading(false)
                dispatch(resetExamState())
                navigate("/management/exams", { replace: true })
            } else {
                // not sent
                setLoading(false)
                setAlert({
                    state: "error",
                    message: res.error.data.message
                })
            }
        }).catch((err) => {
            // proplem
            setLoading(false)
            setAlert({
                state: "error",
                message: err.message
            })
        })
    }
    return (
        <Box sx={{ direction: lang.direction }}>
            {/* header of exam */}
            <Box>
                {/* for seetings */}
                {inputs && inputs.map(input => {
                    return (
                        <TextField
                            key={input.id}
                            color='warning'
                            id={input.id}
                            // name={input.value ? input.value : input.name}
                            label={input.label}
                            variant={input.varient ? input.variant : "outlined"}
                            style={inputStyle}
                            placeholder={input.title && input.title}
                            fullWidth
                            required={input.required ? input.required : false}
                            type={input.type ? input.type : "text"}
                            disabled={input.disabled ? input.disabled : false}
                            value={input.value && input.value}
                            hidden={input.hidden && true}
                            onChange={(e) => handleExam(e.target)}
                        />
                    )
                })} <hr />
            </Box>
            <Box>
                {questions ? (
                    questions.map((question, q) => {
                        return (
                            <Box key={q}>
                                <TextField
                                    color='warning'
                                    id={question.id}
                                    // name={question.value ? question.value : question.name}
                                    label={`${lang.form.question} ${q + 1}`}
                                    variant={question.varient ? question.variant : "outlined"}
                                    placeholder={question.title && question.title}
                                    style={inputStyle}
                                    fullWidth
                                    required={question.required ? question.required : false}
                                    type={question.type ? question.type : "text"}
                                    disabled={question.disabled ? question.disabled : false}
                                    value={question.value && question.value}
                                    hidden={question.hidden && true}
                                    onChange={(e) => handleQuestions(e.target, q)}
                                />
                                {question.options.map((option, o) => {
                                    return (

                                        <Box key={o} sx={{ position: "relative" }}>
                                            <TextField
                                                color='warning'
                                                id={option.id}
                                                // name={option.value ? option.value : option.name}
                                                label={`${lang.form.option} ` + (o + 1)}
                                                variant={option.varient ? option.variant : "outlined"}
                                                style={inputStyle}
                                                fullWidth
                                                placeholder={option.title && option.title}
                                                required={option.required ? option.required : false}
                                                type={option.type ? option.type : "text"}
                                                disabled={option.disabled ? option.disabled : false}
                                                value={option.value && option.value}
                                                hidden={option.hidden && true}
                                                onChange={(e) => handleOptions(e.target, q, o)}
                                                sx={{
                                                    bgcolor: option.id === question.rtOptionId && "green"
                                                }}
                                            />
                                            {option.id !== question.rtOptionId && (
                                                <Button
                                                    color='success'
                                                    sx={{ position: "absolute", right: "10px", top: "25%", bgcolor: "green", color: "white" }}
                                                    onClick={() => chooseRtQuestion({ i: q, value: option.id })}>
                                                    {lang.form.rtOption}
                                                </Button>
                                            )}
                                        </Box>
                                    )
                                })}
                            </Box>
                        )
                    }

                    )
                ) : (
                    // <ButtonStyled title="add question" action={addQuestion} />
                    "empty questions"
                )}
                {questions.length !== 0 && (
                    <Box>
                        <Button color='error' onClick={() => removeQuestion()}>{lang.form.removeQuestion}</Button>
                    </Box>
                )}

                <ButtonStyled title={lang.form.addQuestion} action={addQuestion} />

            </Box>
            <hr />
            <Button type='submit' disabled={exam.partName || loading ? true : false} fullWidth sx={buttonStyle} onClick={() => submit()}>
                {loading ? <Loader /> : lang.send}
            </Button>
            {alert.state && <Alert severity={alert.state}>{alert.message}</Alert>}
        </Box >
    )
}
