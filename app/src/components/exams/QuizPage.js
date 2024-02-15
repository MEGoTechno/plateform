import { Box } from '@mui/material'
import React, { useState } from 'react'
import QuizCard from '../molecules/quiz/QuizCard'
import QuizHeader from '../molecules/quiz/QuizHeader'
import { useAddAttemptMutation, useLazyGetRtOptionsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from "../../hooks/useLazyGetData"
import AnswersPage from './AnswersPage'
import usePostData from '../../hooks/usePostData'

export default function QuizPage({ exam }) {

    const [isLoading, setLoading] = useState(false)
    const [isSended, setSended] = useState(false)


    const [isShowAnswers, setShowAnswers] = useState(false)
    const [attempt, setAttempt] = useState(null)

    const [sendData] = useAddAttemptMutation()
    const [addAttempt] = usePostData(sendData)

    const submit = async (attempt) => {
        setLoading(true)
        const res = await addAttempt(attempt)
        if (res) {
            window.location.reload()
        }
    }

    if (isShowAnswers && attempt) return <AnswersPage attempt={attempt} />

    if (isSended && !attempt) return <>the exam has been sened successfully</>

    return (
        <QuizCard exam={exam} submit={submit} isLoading={isLoading} />
    )
}
