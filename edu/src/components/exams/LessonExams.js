import { Box, Chip, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSameValue } from '../tools/commonFC'
import NotFound from '../tools/NotFound'
import Header from '../tools/Header'
import ExamCard from '../molecules/ExamCard'

export default function LessonsExams() {

  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const [lessonExams, setLessonExams] = useState([])


  // get exams & lessons from state
  if (location.state) {
    var { exams, lessons, grade } = location.state
  }

  const handleLessonExams = (lesson, i) => {
    const lessonExams = getSameValue(exams, "lessonId", lesson.lessonId)
    setLessonExams(lessonExams)
    setValue(i)
  }

  const startExam = (exam) => {
    navigate(`/exams/${exam.unitId}/${exam._id}`, { state: exam })
  }

  useEffect(() => {
    if (location.state) {

      handleLessonExams(lessons[0], 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons, location])


  if (!location.state) {
    return <NotFound />
  }

  return (
    <Box sx={{ m: "20px 0" }}>
      <Divider>
        <Grid container spacing={2} justifyContent={"center"}>

          {lessons && lessons.map((lesson, i) => (
            <Grid key={i} item xs={6} md={4} width={{ md: 500, sm: 350, xs: 250 }} >
              <Chip
                sx={{ width: "100%" }}
                label={lesson.lessonName}
                variant={i === value ? "filled" : "outlined"}
                color='success'
                onClick={() => handleLessonExams(lesson, i)} />
            </Grid>
          ))}

        </Grid>
      </Divider>

      <Header title={lessons[value].lessonName} />

      <Grid container spacing={2}>
        {lessonExams && lessonExams.map((exam, i) => (
          <Grid key={i} item md={6} xs={12}>
            <ExamCard exam={exam} startExam={startExam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
