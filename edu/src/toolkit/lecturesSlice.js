import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    lectures: null
}

const lecturesSlice = createSlice({
    name: 'lectures', initialState,
    reducers: {
        setLectures: (state, action) => {
            state.lectures = action.payload
            return state
        },
        addLecture: (state, action) => {
            const { users } = state
            const newUsers = [...users, action.payload]
            state.users = newUsers
            return state
        },
        updateLecture: (state, action) => {
            const { lectures } = state
            const updatedLecture = action.payload
            const userIndex = lectures.findIndex(obj => obj.userName === updatedLecture.userName)
            lectures[userIndex] = updatedLecture
            return state
        },
        deleteLecture: (state, action) => {
            let { users } = state
            const user = action.payload
            const filteredUsers = users.filter(obj => obj.userName !== user.userName)
            state.users = filteredUsers
            return state
        }
    }
})


export const { setLectures, addLecture, updateLecture, deleteLecture } = lecturesSlice.actions
export default lecturesSlice.reducer