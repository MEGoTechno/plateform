import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Header({ title }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    return (
        <Box display="flex" flexDirection="column" m="20px 0" sx={{ direction: lang.direction }} >
            <Typography variant="h2" fontWeight="bold" sx={{
                color: theme.palette.secondary.main, mb: 2,
            }}>
                {title}
            </Typography>
            <Typography variant="h6" m='5px'>
                {lang.exams.subtitle}
            </Typography>
            <Divider />
        </Box>
    )
}
