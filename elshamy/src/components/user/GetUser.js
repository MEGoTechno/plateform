
import { Alert, Box, Button, Divider, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import ManageUser from './actions/ManageUser'
import { useSelector } from 'react-redux'
import { useLazyGetOneUserQuery, } from '../../toolkit/apiSlice'
import useLazyGetData from '../../hooks/useLazyGetData'
import UserPayments from '../molecules/UserPayments'
import { user_roles } from '../constants/roles'
import Loader from '../tools/Loader'
import UserHeader from '../molecules/UserHeader'
import UserGroup from '../molecules/UserGroup'
import MakeTitle from '../tools/MakeTitle'


export default function GetUser() {

    const { lang } = useSelector(s => s.global)

    const [user, setUser] = useState()

    const [userName, setUserName] = useState("")
    const [isTouched, setTouch] = useState(false)
    const [loading, setLoading] = useState(false)


    const [getData] = useLazyGetOneUserQuery()
    const [getFilteredUser] = useLazyGetData(getData)

    const getFiltered = async () => {
        setLoading(true)

        const res = await getFilteredUser(userName)
        if (res[0]?.role !== user_roles.STUDENT) {
            setUser(null)
            setLoading(false)
            return
        }
        setUser(res[0])
        setTouch(true)

        setLoading(false)
    }

    useEffect(() => {
        if(userName){
            getFiltered()
        }
    }, [userName])

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
                    <Button color='success' disabled={!userName || loading} onClick={getFiltered}>
                        {loading ? <Loader /> : lang.search}
                    </Button>
                </Box>

            </Stack>

            <Divider />

            {(!user && userName && isTouched) && <Alert severity='error'>{lang.users.noUserName} </Alert>}

            {user && <UserHeader user={user} />}
            {user && <UserGroup group={user.group} />}

            {user && <ManageUser user={user} setUser={setUser} />}


            {(user) && <MakeTitle title={"payments"} />}
            {(user) && <UserPayments user={user} isManage={true} />}
        </Box>
    )
}
