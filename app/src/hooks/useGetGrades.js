import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetSettingsQuery } from '../toolkit/apiSlice'
import useLazyGetData from './useLazyGetData'
import { setGlobalMsg, setGrades } from '../toolkit/globalSlice'

export default function useGetGrades() {
    let { grades: found } = useSelector(s => s.global)
    const [grades, setGradesState] = useState(found)
    const dispatch = useDispatch()

    const [getData] = useLazyGetSettingsQuery()
    const [getGrades] = useLazyGetData(getData)

    const setGradesFc = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const grades = await getGrades()
                // setGradesState(grades)
                dispatch(setGrades(grades))
                resolve(grades)

            } catch (err) {
                dispatch(setGlobalMsg({ message: "error", type: "error" }))
                reject(err)
            }

        })
    }

    const isGrades = () => {
        if (!grades) {
            return setGradesFc()
        }
    }

    return [isGrades, grades]
}
