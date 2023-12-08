import { configureStore } from "@reduxjs/toolkit"
import globalSlice from "./globalSlice"
import { apiSlice } from "./apiSlice"
import examSlice from "./examSlice"
import usersSlice from "./usersSlice"
import contentSlice from "./contentSlice"
// import productsSlice from "./productsSlice"

export const store = configureStore({
    reducer: {
        global: globalSlice,
        exam: examSlice,
        usersSettings: usersSlice,
        content: contentSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

