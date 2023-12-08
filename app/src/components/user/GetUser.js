
import { Alert, Box, Button, Divider, Stack, TextField } from '@mui/material'
import { useGetUsersQuery } from '../../toolkit/apiSlice'
import MakeInput from '../tools/makeform/MakeInput'
import { useState } from 'react'
import ManageUser from './actions/ManageUser'
import { useSelector } from 'react-redux'


export default function GetUser({users}) {


    const [user, setUser] = useState()
    const [userName, setUserName] = useState("")
    const [error, setError] = useState(false)

    const getUser = () => {
        const filtered = users.filter((user) => user.userName === userName.trim())
        const [user] = filtered
        if (!user) {
            setError(true)
        } else {
            setError(false)
        }
        setUser(user)
    }

    return (
        <Box sx={{ mt: 5 }}>
            <Stack direction={"column"}>

                <TextField
                    label="user name"
                    placeholder='only userName allowed'
                    fullWidth
                    onChange={(e) => { setUserName(e.target.value) }}
                />
                <Button color='success' onClick={getUser}>search</Button>
            </Stack>
            <Divider />
            {error && <Alert severity='error'>put true user</Alert>}
            {user && <ManageUser user={user} setUser={setUser} />}
        </Box>
    )
}
