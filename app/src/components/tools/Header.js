import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Header({ title, description }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
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
            <Divider sx={{borderWidth: "10px", borderRadius: "6px"}}/>
        </Box>
    )
}
