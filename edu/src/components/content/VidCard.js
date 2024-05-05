import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { buttonStyle } from '../../styles/buttonsStyles';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

export default function VidCard({ lecture, lessonLectures }) {
    const navigate = useNavigate()
    const {lang} = useSelector(s => s.global)

    const theme = useTheme()
    // `http://localhost:5050/${lecture.thumbnail}`
    const goVid = () => {
        const partId = lecture.partId
        const lessonId = `l` + partId.split("l")[1]
        navigate(`/lectures/g1u1/${lessonId}`, { replace: true, state: { lecture, lessonLectures } })
    }

    const thumbnail = lecture?.thumbnail?.url ? lecture?.thumbnail?.url : '/'

    return (
        <Card sx={{ bgcolor: theme.palette.background.alt }}>
            <CardMedia
                sx={{ height: 140 }}
                image={thumbnail}
                title="image"
                alt="add picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {lecture.partName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {lecture.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={buttonStyle} size="small" onClick={() => {
                    goVid()
                }}>{lang.content.watch}</Button>
            </CardActions>
        </Card>
    );
}