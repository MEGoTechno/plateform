import { useTheme } from '@emotion/react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { buttonStyle } from '../../styles/buttonsStyles'
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GetUSerSettings() {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()

    return (

        <Card sx={{ minWidth: 275, direction: "rtl", bgcolor: theme.palette.background.alt }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {lang.users.settings}
                </Typography>
                {/* <Box>
                    <Typography variant="body2">
                        {lang.users.totalUsers} :
                    </Typography>
                </Box> */}
            </CardContent>
            <CardActions>
                <Button sx={buttonStyle} onClick={() => { navigate('/management/user/add') }} size="small">
                    {lang.users.addUser}
                    <PersonAddSharpIcon sx={{ m: "0 5px" }} />
                </Button>
            </CardActions>
        </Card>
    )
}
