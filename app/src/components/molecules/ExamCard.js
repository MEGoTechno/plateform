import styled from '@emotion/styled'
import { Box, Button, Chip, Divider, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlexInBetween } from '../tools/FlexInBetween'
import { buttonError, buttonStyle } from '../../styles/buttonsStyles'
import ModalControlled from '../tools/ModalControlled'
import { useRemoveExamMutation } from '../../toolkit/apiSlice'
import usePostData from '../../hooks/usePostData'

import Loader from "../tools/Loader"
import { removeExam, setExams } from '../../toolkit/examSlice'
import { useNavigate } from 'react-router-dom'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { user_roles } from '../constants/roles'

export default function ExamCard({ exam, isManage, editExam, startExam }) {

    const navigate = useNavigate()
    const theme = useTheme()
    const dispatch = useDispatch()

    const { lang, user } = useSelector(s => s.global)

    const total = useMemo(() =>
        exam.questions.reduce((acc, question) => {
            return acc += question.points
        }, 0), [exam])

    const ExamTypoKey = styled(Typography)({
        p: 1, fontSize: "14px", fontWeight: "600"
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, fontsize: "12px"
    })

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isShowModal: false
    })

    const [sendData] = useRemoveExamMutation()
    const [deleteExam] = usePostData(sendData, formOptions, setFormOptions)


    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await deleteExam({ examId: exam._id })
        dispatch(setExams(null))
        navigate("/management/exams")
    }

    return (
        <Box
            sx={{
                m: "30px 0",
                p: 2,
                bgcolor: theme.palette.background.alt,
                borderRadius: '8px',
                display: "flex", justifyContent: "center", flexWrap: "wrap", flexDirection: "column"
            }}>

            <Box>

                <ExamTypoKey sx={{ textAlign: "center", m: "5px 0" }}>{exam.partName}</ExamTypoKey>

                <Divider color={theme.palette.primary[300]} />

                {isManage && <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>status:</ExamTypoKey>
                    <Chip label={exam.isActive ? "active" : "not active"} color={exam.isActive ? "success" : "error"} size='small' />
                </FlexInBetween>}



                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.time}:</ExamTypoKey>
                    <ExamTypoValue>{(exam.time / 60) || "--"} min</ExamTypoValue>
                </FlexInBetween>

                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.nums}:</ExamTypoKey>
                    <ExamTypoValue>{exam.questions.length}</ExamTypoValue>
                </FlexInBetween >

                <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>{lang.exams.degree}:</ExamTypoKey>
                    <ExamTypoValue>{total || exam.questions.length * 5}</ExamTypoValue>
                </FlexInBetween>

                {(isManage && user.role === user_roles.ADMIN) && <FlexInBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>statistics:</ExamTypoKey>
                    <Chip
                        variant='outlined'
                        label={<BarChartRoundedIcon />}
                        color={"success"} size='small' sx={{ fontWeight: 600 }}
                        onClick={() => navigate("/management/statistics/exam", {state: exam})} />
                </FlexInBetween>}

            </Box>

            <Divider color={theme.palette.primary[300]} />

            {isManage ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2,
                }}>
                    <Button
                        disabled={formOptions.isLoading ? true : false}
                        onClick={() => editExam(exam)} sx={buttonStyle}>{lang.exams.editExam} <EditRoundedIcon /></Button>

                    <Button
                        onClick={() => setFormOptions({ ...formOptions, isShowModal: true })}
                        sx={buttonError}
                        disabled={formOptions.isLoading ? true : false}
                    >{formOptions.isLoading ? <Loader /> : lang.exams.removeExam} <DeleteForeverRoundedIcon /></Button>
                </Box>

            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: 2
                }}>
                    <Button onClick={() => startExam(exam)} sx={buttonStyle}  >{lang.exams.start}</Button>
                </Box>
            )}

            <ModalControlled
                title={"r u sure to remove exam"}
                action={trigger}
                isShowModal={formOptions.isShowModal}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />
        </Box>
    )
}
