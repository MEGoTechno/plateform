import { Children } from "react"

const filterArray = (array, by) => {
    return array.filter((ele, i) => {
        return i === array.findIndex((obj) => {
            return JSON.stringify(ele[by]) === JSON.stringify(obj[by]) 
        })
    })
}


export const getUnique = (array, by) => {
    return filterArray(array, by)
}

export const getSameValue = (array, key, value) => {
    return array.filter((ele) => ele[key] === value)
}

