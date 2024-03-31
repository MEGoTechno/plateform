import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useLazyGetExamsQuery, useLazyGetOneExamQuery, useLazyGetUserAttemptsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../tools/LoaderSkeleton'
import { Box } from '@mui/material'
import Header from '../tools/Header'
import StartExamCard from '../molecules/StartExamCard'

import QuizPage from './QuizPage'
import { useSelector } from 'react-redux'
import AnswersPage from './AnswersPage'

export default function StartExam() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)

    const [searchParams, setSearchParams] = useSearchParams()

    const { examId } = useParams()

    const [exam, setExam] = useState(location.state || null)
    const [isStart, setStart] = useState(false)

    const [attempts, setAttempts] = useState([])
    const [attemptIndex, setAttemptIndex] = useState(null)


    const [getData, { isLoading }] = useLazyGetOneExamQuery()
    const [getExam] = useLazyGetData(getData)

    const [getDataAttempts, { isLoading: attemptLoading }] = useLazyGetUserAttemptsQuery()
    const [getAttempts] = useLazyGetData(getDataAttempts)

    const getBack = () => {
        navigate(-1)
    }

    const trigger = async () => {
        const exam = await getExam(examId)

        if (exam) {
            const res = await getAttempts({ userId: user._id, examId: exam._id })
            if (res) {
                setAttempts(res.attempt)
            }
            setExam(exam)
        }
    }

    const triggerAttempts = async () => {
        const res = await getAttempts({ userId: user._id, examId: exam._id })
        if (res) {
            setAttempts(res.attempt)
        }
    }

    useEffect(() => {
        if (!exam) {
            trigger()
        }

        if (!isStart && exam && attempts?.length <= 0) {
            triggerAttempts()
        }

        if (searchParams.get("attempt")) {
            setAttemptIndex(Number(searchParams.get("attempt")))
        } else {
            setAttemptIndex(null)
        }

    }, [exam, searchParams])

    // console.log("is extensoble", Object.isExtensible(searchParams))


    if (!exam || isLoading || attemptLoading) return <LoaderSkeleton />

    if (isStart && attempts.length <= exam.attemptsNums && exam) return <QuizPage exam={exam} />

    if (!isStart && attempts.length > 0 && attemptIndex > 0 && exam.isShowAnswers) return <AnswersPage attempt={attempts[attemptIndex - 1]} />

    return (
        <Box>
            <Header title={"start exam"} />
            <StartExamCard
                exam={exam}
                getBack={getBack}
                setStart={setStart}
                attempts={attempts}
                setSearchParams={setSearchParams} />
        </Box>
    )
}
