import { useDispatch } from 'react-redux'
import { setGlobalMsg, setUser } from '../toolkit/globalSlice'
import { useState } from 'react'

export default function useLazyGetData(getData) {

    const dispatch = useDispatch()

    const getFromDB = () => {

        return new Promise(async (resolve, reject) => {

            try {
                const result = await getData()

                if (result.error) {
                    // error ===> invalid jwt
                    if (result.error.data.isKick === true) {
                        dispatch(setUser(null))
                        dispatch(setGlobalMsg({ message: "sorry!, you have to log in", severity: "error" }))
                        return;
                    }
                    dispatch(setGlobalMsg({ message: result.error.data.message, severity: "error" }))
                    return;
                }

                // in success
                resolve(result.data)
            } catch (error) {
                dispatch(setGlobalMsg({ message: "error", type: "error" }))
                reject(error)
            }

        })
    }

    return [getFromDB]
}
