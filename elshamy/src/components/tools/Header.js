import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, description }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const navigate = useNavigate()
    return (
        <Box display="flex" flexDirection="column" m="10px 0" sx={{ direction: lang.direction }} >
            <Typography variant="h2" fontWeight="bold" sx={{
                color: theme.palette.secondary.main, mb: 2,
            }}>
                {title}
            </Typography>
            <Typography variant="h6" m='5px'>
                {description && description}
            </Typography>
            <Divider sx={{ borderWidth: "10px", borderRadius: "6px" }} />
        </Box>
    )
}
