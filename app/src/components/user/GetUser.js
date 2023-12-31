
import { Alert, Box, Button, Divider, Stack, TextField } from '@mui/material'
import { useGetUsersQuery } from '../../toolkit/apiSlice'
import MakeInput from '../tools/makeform/MakeInput'
import { useState } from 'react'
import ManageUser from './actions/ManageUser'
import { useSelector } from 'react-redux'


export default function GetUser({ users }) {


    const [user, setUser] = useState()
    const [userName, setUserName] = useState("")
    const [error, setError] = useState(false)
    const {lang} = useSelector(s => s.global)

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
                    label={lang.users.userName}
                    placeholder={lang.users.onlyUserName}
                    fullWidth
                    color='warning'
                    onChange={(e) => { setUserName(e.target.value) }}
                />
                <Box sx={{display: "flex", justifyContent: "center", m: "5px 0"}}>
                    <Button color='success' onClick={getUser}>{lang.search}</Button>
                </Box>
            </Stack>
            <Divider />
            {error && <Alert severity='error'>{lang.users.noUserName}</Alert>}
            {user && <ManageUser user={user} setUser={setUser} />}
        </Box>
    )
}
