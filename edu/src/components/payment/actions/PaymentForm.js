import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import ModalControlled from '../../tools/ModalControlled'
import MakeForm from '../../tools/makeform/MakeForm'

import * as Yup from "yup"

function PaymentForm({ payment, grades, formOptions, setFormOptions, trigger }) {
    const { lang } = useSelector(s => s.global)

    const modifiedGrades = useMemo(() => grades?.map(grade => { return { value: grade?._id, label: grade.gradeName } }) || [], [grades])

    const inputs = [
        {
            name: 'paymentName',
            label: 'payment name',
            value: payment?.paymentName || "",
            validation: Yup.string().required()
        }, {
            name: 'price',
            label: 'price',
            type: 'number',
            value: payment?.price || "",
            validation: Yup.number().required()
        }, {
            name: "grade",
            label: 'choose grade',
            type: 'select',
            options: modifiedGrades,
            value: payment?.grade._id || "",
            validation: Yup.string().required()
        }
    ]

    const handleSubmit = (values, props) => {
        console.log(values)
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })

    }

    return (
        <Box>
            <MakeForm inputs={inputs} onSubmit={handleSubmit} formOptions={formOptions} setFormOptions={setFormOptions} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title={lang.modal.confirm} description="r u sure ?"
                action={trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </Box>
    )
}
export default PaymentForm