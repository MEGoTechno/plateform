import { Box, Button, Divider, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { sendSuccess } from '../styles/buttonsStyles'
import SelectControlled from '../tools/SelectControlled'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ShowPayment from './ShowPayment'
import useGetUsers from '../../hooks/useGetUsers'

export default function ManagePayments({ payments }) {

    const [selectedPayment, setPayment] = useState("")
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const handleChange = (e) => {
        setPayment(e.target.value)

        setSearchParams(params => {
            params.set("payment", e.target.value.paymentName)
            return params
        })

    }


    return (
        <Stack>
            <Stack spacing={{ xs: 1, sm: 2 }} direction={"row"} useFlexGap>
                <SelectControlled
                    value={selectedPayment}
                    handleChange={handleChange}
                    title={"choose payment"}
                    options={payments} keys={{ label: "paymentName" }} />
                <Button onClick={() => navigate('/management/payments/add')} sx={sendSuccess} style={{ width: "auto" }}>add payment</Button>
            </Stack>
            <Divider />

            {selectedPayment && <ShowPayment payment={selectedPayment} />}
        </Stack>
    )
}
