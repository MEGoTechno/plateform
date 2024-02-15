import { Box, Button, Card, CardActions, CardContent, Container, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ShowQuestion from "./ShowQuestion";
import QuizPagination from "./QuizPagination";
import { buttonStyle, sendSuccess } from "../../styles/buttonsStyles";
import ModalControlled from "../../tools/ModalControlled";
import { useSelector } from "react-redux";
import Loader from "../../tools/Loader"
import QuizHeader from "./QuizHeader";

export default function QuizCard({ exam, submit, isLoading }) {
    const theme = useTheme()
    const { user } = useSelector(s => s.global)

    const [time, setTime] = useState(exam.time || 15 * 60)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [isShowModal, setShowModal] = useState(false)
    const [modalMsg, setModalMsg] = useState("u didnt answer all questions")

    const closeModal = () => setShowModal(false)

    const openModal = () => {
        changeModalMsg()
        setShowModal(true)
    }

    const changeModalMsg = () => {
        const isAllAnswered = exam.questions.every(question => question.chosenOptionId)
        if (isAllAnswered) {
            setModalMsg("r u sure")
        } else {
            setModalMsg("u didnt answer all questions")
        }
    }

    const sendData = () => {
        const chosenOptions = exam.questions.map(question => {

            if (question.chosenOptionId) {
                const { _id, chosenOptionId } = question
                return { questionId: _id, chosenOptionId }
            } else {
                const { _id } = question
                return { questionId: _id, chosenOptionId: null }
            }
        });

        closeModal()

        const attempt = {
            user: user._id,
            exam: exam._id,
            mark: "",
            tokenTime: time,
            chosenOptions
        }
        submit(attempt)

    }
    // chosen option => questionId: _id, chosenOptionId

    const disabledNext = exam.questions.length <= 0 || exam.questions.length === (currentQuestionIndex + 1) || isLoading ? true : false
    const disabledPre = exam.questions.length <= 0 || (currentQuestionIndex) === 0 || isLoading ? true : false

    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 6, justifyContent: "center", flexDirection: "column" }}>
            <QuizHeader exam={exam} submit={sendData} time={time} setTime={setTime} />

            <Card sx={{ bgcolor: theme.palette.background.alt, width: "100%" }} >

                <ShowQuestion currentQuestion={exam.questions[currentQuestionIndex]} isLoading={isLoading} />

                <CardActions>
                    <Button sx={buttonStyle} disabled={disabledPre} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                        previous question
                    </Button>

                    {
                        !disabledNext ? (
                            <Button sx={buttonStyle} disabled={disabledNext} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                next question
                            </Button>
                        ) : (
                            <Button sx={sendSuccess} disabled={isLoading} onClick={openModal}>
                                {isLoading ? <Loader /> : "submit"}
                            </Button>
                        )
                    }

                </CardActions>

                <Box >
                    <QuizPagination examQuestions={exam.questions} count={exam.questions.length} index={currentQuestionIndex} setIndex={setCurrentQuestionIndex} isLoading={isLoading} />
                </Box>
                <ModalControlled title={modalMsg} action={sendData} isShowModal={isShowModal} close={closeModal} />
            </Card>
        </Box>

    )
}
