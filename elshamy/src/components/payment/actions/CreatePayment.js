import { Alert, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaymentForm from './PaymentForm'
import Header from '../../tools/Header'
import { useDispatch, useSelector } from 'react-redux'
import useGetGrades from '../../../hooks/useGetGrades'
import LoaderSkeleton from '../../tools/LoaderSkeleton'
import { useCreatePaymentMutation } from '../../../toolkit/apiSlice'
import usePostData from '../../../hooks/usePostData'
import { addPayment } from '../../../toolkit/paymentSlice'

export default function CreatePayment() {

    const { grades } = useSelector(s => s.groupsState)
    const [getGrades] = useGetGrades()
    const dispatch = useDispatch()


    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })

    const [sendData] = useCreatePaymentMutation()
    const [createPayment] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        const res = await createPayment(formOptions.values)
        console.log(res)
        dispatch(addPayment(res))
        // navigate("/management/exams", { replace: true })
    }


    useEffect(() => {
        if (!grades) {
            getGrades()
        }
    }, [grades])

    if (!grades) return <LoaderSkeleton />

    if (grades.length <= 0) return <Box>
        <Header title={"add payment"} />
        <Alert severity='warning'>create grade first</Alert>
    </Box>

    return (
        <Box>
            <Header title={"add payment"} />
            <PaymentForm grades={grades} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}
