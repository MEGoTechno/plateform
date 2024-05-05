import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MakeForm from '../../../tools/makeform/MakeForm'
import ModalControlled from '../../../tools/ModalControlled'


export default function ExamForm({ inputs, formOptions, setFormOptions, trigger }) {
    const { lang } = useSelector(s => s.global)


    // edit name (unit. lesson)
    // for get values and pass to modal
    const handleSubmit = (values, props) => {
        console.log(values)
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })

    }


    return (
        <>
            <MakeForm inputs={inputs} onSubmit={handleSubmit} formOptions={formOptions} setFormOptions={setFormOptions} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title={lang.modal.confirm} description="r u sure ?"
                action={trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </>
    )
}
