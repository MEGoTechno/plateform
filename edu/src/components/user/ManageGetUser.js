import { Box } from '@mui/material'
import React from 'react'
import GetUSerSettings from './molecules/GetUSerSettings'
import GetUser from './GetUser'
import MakeTitle from '../tools/MakeTitle'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { useSelector } from 'react-redux'

export default function ManageGetUser() {
    const { lang } = useSelector(s => s.global)

    return (
        <Box>
            <GetUSerSettings />

            <Box m={"10px 0"}>
                <MakeTitle title={lang.users.manage}>
                    <ManageAccountsSharpIcon sx={{opacity: .8}} />
                </MakeTitle>
            </Box>

            <GetUser />
        </Box>
    )
}
