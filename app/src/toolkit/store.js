import { configureStore } from "@reduxjs/toolkit"
import globalSlice from "./globalSlice"
import { apiSlice } from "./apiSlice"
// import productsSlice from "./productsSlice"

export const store = configureStore({
    reducer: {
        global: globalSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: localStorage.getItem("user") || "not User"
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

