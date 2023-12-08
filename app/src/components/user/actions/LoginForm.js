import { useEffect, useState } from "react"
import MakeForm from "../../tools/makeform/MakeForm"
import { useLoginMutation } from "../../../toolkit/apiSlice"
import usePostData from "../../../hooks/usePostData"
import { useDispatch } from "react-redux"
import { setUser } from "../../../toolkit/globalSlice"

export default function LoginForm({ inputs }) {
    const dispatch = useDispatch()

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isDone: false,
        values: null,
        getData: null
    })
    const [sendData] = useLoginMutation()
    const [sendLogin] = usePostData(sendData, formOptions, setFormOptions)

    // for get values and pass to modal
    const trigger = async (values, props) => {
        const res = await sendLogin(values)
        dispatch(setUser(res))
    }

    return (
        <>
            <MakeForm inputs={inputs} onSubmit={trigger} formOptions={formOptions} setFormOptions={setFormOptions} />
        </>
    )
}
