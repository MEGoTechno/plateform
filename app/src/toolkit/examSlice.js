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
        }
    }
})

export const {
    setExams
} = examSlice.actions
export default examSlice.reducer