import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useSelector } from 'react-redux'
import ModalControlled from '../../tools/ModalControlled'

export default function UserForm({ inputs, formOptions, setFormOptions, trigger }) {
    const { lang } = useSelector(s => s.global)

    // for get values and pass to modal
    const handleSubmit = (values, props) => {
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
