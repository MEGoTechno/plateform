import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../hooks/cookies";


const initialState = {
    exam: {
        gradeId: "",
        unitId: "",
        lessonId: "",
        partId: "",
        gradeName: "",
        unitName: "",
        lessonName: "",
        partName: "",
        description: "",
        degree: "",
        time: "",
        questions: []
    },
    createdExams: null
}

const examSlice = createSlice({
    name: 'exam', initialState,
    reducers: {
        addQuestionAction: (state, action) => {
            const { questions } = state.exam
            state.exam.questions = [...questions, action.payload]
            return state
        },
        editQuestionAction: (state, action) => {
            const { questions } = state.exam
            const { value, i } = action.payload
            questions[i].title = value
            console.log(questions)
            return state
        },
        editOptionAction: (state, action) => {
            const { questions } = state.exam
            const { value, i, o } = action.payload
            questions[i].options[o].title = value
            return state
        },
        chooseOptionAction: (state, action) => {
            const { questions } = state.exam
            const { value, i } = action.payload
            questions[i].rtOptionId = value
            return state
        },
        removeQuestionAction: (state, action) => {
            const { questions } = state.exam
            questions.pop()
            state.exam.questions = questions
            return state
        },
        editExamSettings: (state, action) => {
            const settings = action.payload
            for (let key in settings) {
                state.exam[key] = settings[key]
            }
            return state
        },
        resetExamState: (state) => {
            state = {
                exam: {
                    gradeId: "",
                    unitId: "",
                    lessonId: "",
                    partId: "",
                    gradeName: "",
                    unitName: "",
                    lessonName: "",
                    partName: "",
                    description: "",
                    degree: "",
                    time: "",
                    questions: []
                },
            }
            return state
        },
        editExamAction: (state, action) => {
            state.exam = action.payload
            return state
        },
        getCreatedExams: (state, action) => {
            state.createdExams = action.payload
            setCookie("h", action.payload)
            return state
        },
        addExamToCreated: (state, action) => {
            let exams = state.createdExams
            exams = [...state.createdExams, action.payload]

            state.createdExams = exams
            console.log(action.payload)
            // setCookie("e", [...state.createdExams, action.payload])
            return state
        }
    }
})

export const { addQuestionAction, editQuestionAction, editOptionAction, removeQuestionAction, editExamSettings, chooseOptionAction, resetExamState, editExamAction
    , addExamToCreated, getCreatedExams } = examSlice.actions
export default examSlice.reducer