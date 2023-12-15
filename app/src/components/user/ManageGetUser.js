import { Box } from '@mui/material'
import React from 'react'
import GetUSerSettings from './GetUSerSettings'
import GetUser from './GetUser'
import MakeTitle from '../tools/MakeTitle'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { useSelector } from 'react-redux'

export default function ManageGetUser({ users }) {
    const { lang } = useSelector(s => s.global)

    return (
        <Box>
            <GetUSerSettings users={users} />

            <Box m={"10px 0"}>
                <MakeTitle title={lang.users.manage}>
                    <ManageAccountsSharpIcon />
                </MakeTitle>
            </Box>
            <GetUser users={users} />
        </Box>
    )
}
