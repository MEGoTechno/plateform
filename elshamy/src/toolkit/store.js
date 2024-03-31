import { configureStore } from "@reduxjs/toolkit"
import globalSlice from "./globalSlice"
import { apiSlice } from "./apiSlice"
import examSlice from "./examSlice"
import usersSlice from "./usersSlice"
import lecturesSlice from "./lecturesSlice"
import messagesSlice from "./messagesSlice"
import groupsSlice from "./groupsSlice"
import paymentSlice from "./paymentSlice"

export const store = configureStore({
    reducer: {
        global: globalSlice,
        usersSettings: usersSlice,
        examsState: examSlice,
        lecturesState: lecturesSlice,
        messagesState: messagesSlice,
        groupsState: groupsSlice,
        paymentState: paymentSlice,
        
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

