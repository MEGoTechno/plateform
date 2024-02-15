import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../hooks/cookies";
import { lang } from "../components/tools/lang";



const initialState = {
    grades: null,
    groups: null
}

const groupsSlice = createSlice({
    name: 'global', initialState,
    reducers: {
        setGrades: (state, action) => {
            state.grades = [...action.payload]
            setCookie("s", state.grades)
            return state
        },
        addGrade: (state, action) => {
            const { grades } = state
            state.grades = [...grades, action.payload]
            setCookie("s", state.grades)
            return state
        },
        setGroups: (state, action) => {
            state.groups = action.payload
            return state
        },
        resetGroupsState: (state) => {
            state.groups = null
            state.grades = null
            return state
        }
    }
})

export const { setGrades, addGrade, setGroups, resetGroupsState } = groupsSlice.actions
export default groupsSlice.reducer