import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { buttonStyle } from '../styles/buttonsStyles';
import { useNavigate } from 'react-router-dom';

export default function VidCard({ lecture, lessonLectures }) {
    const navigate = useNavigate()

    const goVid = () => {
        navigate(`/management/content/g1u1/${lecture.lessonId}/${lecture.partId}`, { replace: true, state: { lecture, lessonLectures } })
    }
    console.log(lecture)
    return (
        <Card sx={{ width: 280 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={`http://localhost:5050/${lecture.thumbnail}`}
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
                {/* <Button sx={buttonStyle} size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    );
}