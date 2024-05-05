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
    lang: lang.ar,
    globalMsg: null
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
        updateUser: (state, action) => {
            const user = state.user
            const updated = { ...user, ...action.payload }

            removeCookie("u")
            setCookie("u", updated)
            state.user = updated
            return state
        },
        logout: (state, action) => {
            removeCookie("u")
            removeCookie("h")
            removeCookie("s")
            state.user = null
            state.grades = null
            return state
        },
        setGlobalMsg: (state, action) => {
            if (!action.payload) {
                state.globalMsg = null
                return state
            }
            state.globalMsg = { message: action.payload.message, severity: action.payload.severity }// isTrue , msg
            return state;
        },
    }
})

export const { setMode, setUser, updateUser, logout, setGlobalMsg } = globalSlice.actions
export default globalSlice.reducer