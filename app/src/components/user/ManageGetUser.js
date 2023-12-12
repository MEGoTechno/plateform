import { Box } from '@mui/material'
import React from 'react'
import GetUSerSettings from './GetUSerSettings'
import GetUser from './GetUser'
import MakeTitle from '../tools/MakeTitle'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';


export default function ManageGetUser({ users }) {
    console.log(users)

    return (
        <Box>
            <GetUSerSettings users={users} />
            
            <Box m={"10px 0"}>
                <MakeTitle title={"manage"}>
                    <ManageAccountsSharpIcon />
                </MakeTitle>
            </Box>
            <GetUser users={users} />
        </Box>
    )
}
