import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import FormControlled from '../tools/FormControlled'
import ExamForm from './ExamForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../tools/Header'

export default function AddExam() {
    const navigate = useNavigate()
    const { exam } = useSelector(s => s.exam)
    const { lang } = useSelector(s => s.global)

    useEffect(() => {
        if (!exam.gradeId) {
            navigate("/management/exams")
        }
    }, [navigate, exam])

    return (
        <Box>
            <Header title={lang.exams.addExam} />
            {/* <FormControlled inputs={inputs} data={{}} onSubmit={submit} loading={loading} /> */}
            {exam.gradeId && <ExamForm exam={exam} />}

        </Box>
    )
}
