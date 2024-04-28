import { Box, Button, Stack } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { buttonError, buttonStyle } from '../../styles/buttonsStyles'
import useGetUsers from '../../hooks/useGetUsers'
import { useSelector } from 'react-redux'
import LoaderSkeleton from '../tools/LoaderSkeleton'

import PaymentDataGrid from './PaymentDataGrid'
import { user_roles } from '../constants/roles'
import ModalControlled from '../tools/ModalControlled'
import { useCheckUsersPaymentMutation } from '../../toolkit/apiSlice'
import usePostData from '../../hooks/usePostData'


function ShowPayment({ payment }) {

    const { lang } = useSelector(s => s.global)

    const [users, setUsers] = useState(null)

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isError: false,
        isShowModal: false,
        isDone: false,
        doneMessage: "it is done",
        values: null,
        res: "",
        trigger: null
    })


    const [pageState, setPageState] = useState({
        isLoading: formOptions.isLoading || false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const [getUsers] = useGetUsers()


    const trigger = async () => {
        const res = await getUsers(setPageState, paginationModel, null, { grade: payment.grade, role: user_roles.STUDENT })
        setUsers(res)
    }

    useEffect(() => {
        trigger()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationModel, paginationModel.page, paginationModel.pageSize, payment, users])




    const [sendData] = useCheckUsersPaymentMutation()
    const [checkUsers] = usePostData(sendData, formOptions, setFormOptions)

    const checkFc = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await checkUsers({ gradeId: payment.grade, isActive: false, payment: payment._id })
        setUsers(null)
    }

    const activateFc = async () => {
        setFormOptions({
            ...formOptions, isLoading: true, isShowModal: false
        })
        await checkUsers({ gradeId: payment.grade, isActive: true, payment: payment._id })
        setUsers(null)
    }


    if (!users) return <LoaderSkeleton />

    return (
        <Box>
            <Stack spacing={{ xs: 1, sm: 2 }} direction={"row"} useFlexGap>
                <Button
                    onClick={() => setFormOptions({ ...formOptions, isShowModal: true, trigger: activateFc })}
                    sx={buttonStyle}> activate </Button>

                <Button
                    onClick={() => setFormOptions({ ...formOptions, isShowModal: true, trigger: checkFc })}
                    sx={buttonError}>check</Button>
            </Stack>

            <PaymentDataGrid
                payment={payment}
                users={users}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                pageState={pageState}
            />

            {formOptions.isShowModal && <ModalControlled
                title={lang.modal.confirm} description="r u sure ?"
                action={formOptions.trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </Box>
    )
}

export default ShowPayment
