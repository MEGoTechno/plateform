import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null
}

const usersSlice = createSlice({
    name: "users", initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
            return state
        },
        addUser: (state, action) => {
            const { users } = state
            const newUsers = [...users, action.payload]
            state.users = newUsers
            return state
        },
        updateUserState: (state, action) => {
            if (state.users) {
                const { users } = state
                const user = action.payload
                const userIndex = users.findIndex(obj => obj.userName === user.userName)
                users[userIndex] = user
            }
            return state
        },
        delteUser: (state, action) => {
            let { users } = state
            const user = action.payload
            const filteredUsers = users.filter(obj => obj.userName !== user.userName)
            state.users = filteredUsers
            return state
        }
    }
})

export const { setUsers, addUser, updateUserState, delteUser } = usersSlice.actions
export default usersSlice.reducer