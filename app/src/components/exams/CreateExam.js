import styled from '@emotion/styled'
import { Box, Typography, useTheme, Button, Divider, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlexInBetween } from '../tools/FlexInBetween'
import { useNavigate } from 'react-router-dom'
import { editExamAction, resetExamState } from '../../toolkit/examSlice'
import { useRemoveExamMutation } from '../../toolkit/apiSlice'
import Loader from '../tools/Loader'
import ModalControlled from '../tools/ModalControlled'

export default function CreateExam({ exam, isManage }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [removeExamAction] = useRemoveExamMutation()
    const { lang } = useSelector(s => s.global)
    const [settings, setSettings] = useState({
        isShowModal: false,
        title: "",

    })

    const [loading, setLoading] = useState(false)
    // alert if errors for add year
    const [alert, setAlert] = useState({
        state: false,
        message: ""
    })

    const ExamTypoKey = styled(Typography)({
        p: 1, color: theme.palette.secondary[500], fontSize: "14px", fontWeight: "600"
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, color: theme.palette.secondary[400], fontsize: "12px"
    })

    const buttonStyle = {
        mt: 1,
        ml: "auto", width: "100%",
        bgcolor: theme.palette.background.alt,
        color: theme.palette.secondary[300],
        fontWeight: "600",
        "&:hover": {
            bgcolor: theme.palette.secondary[300],
            color: theme.palette.background.alt,

        }
    }

    const editExam = () => {
        dispatch(editExamAction(exam))
        navigate("/management/exams/add-exam")
    }
    const shoModal = () => {
        setSettings({
            ...settings, isShowModal: true, title: "r u sure to delete"
        })
    }

    const removeExam = () => {
        setLoading(true)
        removeExamAction(exam).then((res) => {
            if (res.data) {
                setLoading(false)
                dispatch(resetExamState())
            } else {
                setLoading(false)
                setAlert({
                    state: "error",
                    message: res.error.data.message
                })
            }
        }).catch(err => {
            setLoading(false)
            setAlert({
                state: "error",
                message: err.message
            })
        })
    }

    return (
        <Box
            sx={{
                m: "30px 0",
                p: 2,
                bgcolor: theme.palette.primary[600],
                borderRadius: '8px',
                display: "flex", justifyContent: "center", flexWrap: "wrap", width: "250px", flexDirection: "column"
            }}>
            <Box>
                <ExamTypoKey sx={{ textAlign: "center", m: "5px 0" }}>{exam.partName}</ExamTypoKey>
                <Divider color={theme.palette.primary[300]} />
                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.time}:</ExamTypoKey>
                    <ExamTypoValue>{exam.time || "--"}</ExamTypoValue>
                </FlexInBetween>
                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.nums}:</ExamTypoKey>
                    <ExamTypoValue>{exam.questions.length}</ExamTypoValue>
                </FlexInBetween >
                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.degree}:</ExamTypoKey>
                    <ExamTypoValue>{exam.degree || exam.questions.length * 5}</ExamTypoValue>
                </FlexInBetween>
            </Box>
            <Divider color={theme.palette.primary[300]} />
            {isManage ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2
                }}>
                    <Button onClick={() => { editExam() }} sx={buttonStyle}>edit</Button>
                    <Button onClick={shoModal}
                        sx={buttonStyle}
                    >{loading ? <Loader /> : "remove"}</Button>
                </Box>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2
                }}>
                    <Button sx={buttonStyle} disabled >start exam</Button>
                </Box>
            )}
            {alert.state && <Alert severity={alert.state}>{alert.message}</Alert>}

            <ModalControlled
                title={settings.title}
                action={removeExam}
                isShowModal={settings.isShowModal}
                close={() => setSettings(false)} />
        </Box>
    )
}
