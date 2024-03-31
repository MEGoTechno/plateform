import Cookies from "universal-cookie"
const cookies = new Cookies()

export const setCookie = (name, data) => {
    cookies.set(name, data, {
        path: "/",
        maxAge: 2 * 24 * 60 * 60
    })
}

export const getCookie = (name) => {
    const data = cookies.get(name)
    return data
}

export const removeCookie = (name) => {
    cookies.remove(name)
}