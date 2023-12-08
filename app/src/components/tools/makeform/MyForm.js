import { Box } from '@mui/material'
import React, {  useState } from 'react'
import MakeForm from '../components/tools/makeform/MakeForm'
import * as Yup from "yup"
import ModalControlled from '../components/tools/ModalControlled'
import { setGlobalMsg } from '../toolkit/globalSlice'
import { useDispatch } from 'react-redux'

export default function MyForm({inputs, mainFc}) {
    const dispatch = useDispatch()
    const [formOptions, setFormOptions] = useState({ // if not modal use only 2 compose (default 3)
        isLoading: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "",
        values: null,
        getData: null
    })

    // for get values and pss to modal
    const handleSubmit = (values, props) => {
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })
    }
    // main fc by modal
    const sendData = () => {
        setFormOptions({ ...formOptions, isLoading: true, isShowModal: false, })
        setTimeout(() => {
            setFormOptions({
                isLoading: false,
                isShowModal: false,
                isDone: true,
                doneMessage: "data has been sent successfully",
                values: null
            })
            dispatch(setGlobalMsg({isTrue: true, msg: formOptions.doneMessage}))
            console.log("data has beent sent")
        }, 3000)
    }

    return (
        <>
            <MakeForm inputs={inputs} onSubmit={handleSubmit} formOptions={formOptions} setFormOptions={setFormOptions} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title="confirm action" description="r u sure ?"
                action={sendData}
                isShowModal={formOptions.isShowModal} 
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </>
    )
}
