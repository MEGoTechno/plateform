import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: null,
}

const examSlice = createSlice({
    name: 'exam', initialState,
    reducers: {
        setExams: (state, action) => {
            state.exams = action.payload
            return state
        },
        removeExam: (state, action) => {
            const exams = state.exams
            console.log(exams)
            const filtered = state.exams.filter(exam => exam._id !== action.payload)
            state.exams = filtered
            return state
        }
    }
})

export const {
    setExams, removeExam
} = examSlice.actions
export default examSlice.reducer