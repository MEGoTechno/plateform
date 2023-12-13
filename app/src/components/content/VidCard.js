import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { buttonStyle } from '../styles/buttonsStyles';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

export default function VidCard({ lecture, lessonLectures }) {
    const navigate = useNavigate()
    const theme = useTheme()
// `http://localhost:5050/${lecture.thumbnail}`
    const goVid = () => {
        navigate(`/content/g1u1/${lecture.lessonId}/${lecture.partId}`, { replace: true, state: { lecture, lessonLectures } })
    }

    console.log(lecture)
    return (
        <Card sx={{ bgcolor: theme.palette.background.alt }}>
            <CardMedia
                sx={{ height: 140 }}
                image={`/images/download.jpg`}
                title="green iguana"
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
                }}>Watch</Button>
            </CardActions>
        </Card>
    );
}