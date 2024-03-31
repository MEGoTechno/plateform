import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetGrades from '../../../hooks/useGetGrades'
import LoaderSkeleton from '../../tools/LoaderSkeleton'
import { Alert, Box } from '@mui/material'
import Header from '../../tools/Header'
import PaymentForm from './PaymentForm'
import { useLocation } from 'react-router-dom'
// import usePostData from '../../../hooks/usePostData'
// import { useUpdatePaymentMutation } from '../../../toolkit/apiSlice'

function EditPayment() {

    const dispatch = useDispatch()

    const { grades } = useSelector(s => s.groupsState)
    const [getGrades] = useGetGrades()

    const location = useLocation()
    const payment = location.state


    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: ""
    })



    // const [sendData] = useUpdatePaymentMutation()
    // const [updatePayment] = usePostData(sendData, formOptions, setFormOptions)

    const trigger = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        // const res = await updatePayment(formOptions.values)
        dispatch()
        // navigate("/management/exams", { replace: true })
    }


    useEffect(() => {
        if (!grades) {
            getGrades()
        }
    }, [grades])

    if (!grades) return <LoaderSkeleton />

    if (!payment) return <Box>
        <Header title={"edit payment"} />
        <Alert severity='error'>please do enter the page from the link</Alert>
    </Box>

    if (grades.length <= 0) return <Box>
        <Header title={"edit payment"} />
        <Alert severity='warning'>create grade first</Alert>
    </Box>

    return (
        <Box>
            <Header title={"edit payment"} />
            <PaymentForm payment={payment} grades={grades} formOptions={formOptions} setFormOptions={setFormOptions} trigger={trigger} />
        </Box>
    )
}

export default EditPayment
