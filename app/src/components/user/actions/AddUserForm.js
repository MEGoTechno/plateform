import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import ModalControlled from '../../tools/ModalControlled'
import * as Yup from "yup"
import { useSelector } from 'react-redux'

export default function AddUserForm({ trigger, setFormOptions, formOptions }) {
    const { grades } = useSelector(s => s.global)

    const inputs = [{
        name: "name",
        label: "student name",
        validation: Yup.string().required("name is required")
    }, {
        name: "userName",
        label: "user name",
        validation: Yup.string().required("user name should be unique")
    }, {
        name: "email",
        label: "email",
        validation: Yup.string().required()
    }, {
        name: "phone",
        label: "phone",
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "familyPhone",
        label: "family phone",
        type: "number",
        validation: Yup.string("should be numbers").required().min(10, "invalid number"),
    }, {
        name: "password",
        label: "password",
        type: "password",
        validation: Yup.string().required("password is required").min(6, "should be at least 6 characters"),
    }, {
        name: "grade",
        label: "choose grade",
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
