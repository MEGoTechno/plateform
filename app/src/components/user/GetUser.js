
import { Alert, Box, Button, Divider, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import ManageUser from './actions/ManageUser'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetOneUserQuery, useLazyGetPaymentsByGradeQuery, useLazyGetPaymentsQuery } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import UserPayments from './UserPayments'
import { user_roles } from '../constants/roles'


export default function GetUser() {


    const [user, setUser] = useState()

    const [userName, setUserName] = useState("")
    const [isTouched, setTouch] = useState(false)

    const [payments, setPayments] = useState(null)

    const [getDataPayments] = useLazyGetPaymentsByGradeQuery()
    const [getPayments] = useLazyGetData(getDataPayments)


    const { lang } = useSelector(s => s.global)

    const [getData] = useLazyGetOneUserQuery()
    const [getFilteredUser] = useLazyGetData(getData)

    const getFiltered = async () => {
        const res = await getFilteredUser(userName)
        if (res[0].role !== user_roles.STUDENT) {
            setUser(null)
            return

        }
        setUser(res[0])
        setTouch(true)
    }

    const trigger = async () => {
        const res = await getPayments(user.grade)
        setPayments(res)
    }

    let [handledPayment, setHandledPayment] = useState(null)

    useEffect(() => {
        if (user) {
            trigger()
        }

    }, [payments, user])

    useEffect(() => {

        if (payments?.length > 0 && user) {
            const modified = JSON.parse(JSON.stringify(payments))

            modified.map((payment) => {
                user.payments.includes(payment._id) ? payment.isPaid = true : payment.isPaid = false
                return payment
            })

            setHandledPayment(modified)
        }

    }, [payments, user])

    return (
        <Box sx={{ mt: 5 }}>
            <Stack direction={"column"}>

                <TextField
                    label={lang.users.userName}
                    placeholder={lang.users.onlyUserName}
                    fullWidth
                    color='warning'
                    onChange={(e) => { setUserName(e.target.value) }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", m: "5px 0" }}>
                    <Button color='success' disabled={!userName} onClick={getFiltered}>{lang.search}</Button>
                </Box>
            </Stack>
            <Divider />
            {(!user && userName && isTouched) && <Alert severity='error'>{lang.users.noUserName} </Alert>}
            {user && <ManageUser user={user} setUser={setUser} />}
            {(handledPayment && user) && <UserPayments payments={handledPayment} user={user} />}
        </Box>
    )
}
