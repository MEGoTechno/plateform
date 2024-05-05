import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'

import Header from '../tools/Header'
import AttemptCard from '../molecules/answers/AttemptCard'
import AttemptHeader from '../molecules/answers/AttemptHeader'
import { useSearchParams } from 'react-router-dom'

const modifyAndGetScore = (exam, chosenOptions) => {

  // chosenOptionId = rtOptionId ==> + score, right
  const score = exam.questions.reduce((acc, question, i,) => {

    const AnsweredQuestion = chosenOptions.filter(({ questionId }) => questionId === question._id)[0]

    if (AnsweredQuestion?.chosenOptionId === "Not answered" || !AnsweredQuestion?.chosenOptionId) {

      question.isAnswered = false
      return acc
    }


    if (question.rtOptionId === AnsweredQuestion?.chosenOptionId) {

      question.isAnswered = true
      question.chosenOptionId = AnsweredQuestion.chosenOptionId

      return acc += question.points
    } else {

      question.isAnswered = true
      question.chosenOptionId = AnsweredQuestion.chosenOptionId

      return acc
    }


  }, 0)
  // != 

  const percentage = (score / exam.total) * 100
  const rating = percentage >= 85 ? "excellent" : percentage >= 75 ? "good" : percentage >= 65 ? "medium" : "bad"

  exam.assessment = { score, percentage, rating, total: exam.total }
  return score

}

const totalDegree = (exam) => {

  const total = exam.questions.reduce((acc, question) => {
    return acc += question.points || 1
  }, 0)

  exam.total = total
  return total
}

export default function AnswersPage({ attempt }) {

  const exam = useMemo(() => JSON.parse(JSON.stringify(attempt.exam)), [attempt])

  totalDegree(exam)
  modifyAndGetScore(exam, attempt.chosenOptions)

  exam.tokenTime = attempt.tokenTime

  // score header
  // answers

  return (
    <Box>
      <Header title={"attempt"} />
      <Box>
        <AttemptHeader exam={exam} />
        <AttemptCard isAnsweres={true} exam={exam} />
      </Box>
    </Box>
  )
}
