import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import ModalControlled from '../../tools/ModalControlled'
import * as Yup from "yup"
import { useSelector } from 'react-redux'

export default function AddUserForm({ trigger, setFormOptions, formOptions }) {
    const { grades , lang} = useSelector(s => s.global)

    const inputs = [{
        name: "name",
        label: lang.users.name,
        validation: Yup.string().required("name is required")
    }, {
        name: "userName",
        label: lang.users.userName,
        validation: Yup.string().required("user name should be unique")
    }, {
        name: "email",
        label: lang.users.email,
        validation: Yup.string().required()
    }, {
        name: "phone",
        label: lang.users.phone,
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "familyPhone",
        label: lang.users.familyPhone,
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "password",
        label: lang.users.password,
        type: "password",
        validation: Yup.string().required("password is required").min(6, "should be at least 6 characters"),
    }, {
        name: "grade",
        label: lang.users.chooseGrade,
        type: "radio",
        validation: Yup.string().required("required")
    }]

    const showModal = (values) => {
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })
    }

    return (
        <div>
            <MakeForm inputs={inputs} formOptions={formOptions} onSubmit={showModal} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title="confirm action" description="r u sure ?"
                action={trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </div>
    )
}
