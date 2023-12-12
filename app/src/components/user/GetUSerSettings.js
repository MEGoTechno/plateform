import { useTheme } from '@emotion/react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { buttonStyle } from '../styles/buttonsStyles'
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import { useNavigate } from 'react-router-dom';

export default function GetUSerSettings({ users }) {
    const theme = useTheme()
    const navigate = useNavigate()

    return (

        <Card sx={{ minWidth: 275, direction: "rtl", bgcolor: theme.palette.background.alt }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Settings
                </Typography>
                <Box>
                    <Typography variant="body2">
                        total users : {users.length}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button sx={buttonStyle} onClick={() => { navigate('/management/user/add-user') }} size="small">
                    Add user
                    <PersonAddSharpIcon sx={{ m: "0 5px" }} />
                </Button>
            </CardActions>
        </Card>
    )
}
