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
    grades: getCookie("s") ? getCookie("s") : null,
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
        logout: (state, action) => {
            removeCookie("u")
            state.user = null
            return state
        },
        setGrades: (state, action) => {
            const { grades } = state
            if (grades) {
                state.grades = [...grades, action.payload]
            } else {
                state.grades = action.payload
            }
            setCookie("s", state.grades)
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

export const { setMode, setUser, logout, setGrades, setGlobalMsg } = globalSlice.actions
export default globalSlice.reducer