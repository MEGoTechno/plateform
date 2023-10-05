import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../hooks/cookies";
import { lang } from "../components/tools/lang";



const getMode = () => {
    let mode = localStorage.getItem("mode")
    if (mode) {
        if (mode === "light") {
            return mode
        } else {
            mode = "dark"
            return mode
        }
    } else {
        mode = "dark"
    }
    return mode
}


const initialState = {
    mode: getMode(), 
    user: getCookie("u") ? getCookie("u") : null,
    lang: lang.ar
}

const globalSlice = createSlice({
    name: 'global', initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
            localStorage.setItem("mode", state.mode)
            return state
        },
        setUser: (state, action) => {
            setCookie("u", action.payload)
            state.user = action.payload
            return state
        },
        logout: (state, action) => {
            removeCookie("u")
            state.user = null
            return state
        },
    }
})

export const { setMode, setUser , logout} = globalSlice.actions
export default globalSlice.reducer