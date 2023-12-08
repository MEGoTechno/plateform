import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveLectureMutation } from '../../../toolkit/apiSlice';
import ModalControlled from '../../tools/ModalControlled';
import { useNavigate } from "react-router-dom"
import { useTheme } from '@mui/material';
import usePostData from '../../../hooks/usePostData';
import { useDispatch } from 'react-redux';
import { setLectures } from '../../../toolkit/contentSlice';

export default function LectureSettings({ lecture, editLecture }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [settings, setSettings] = React.useState({
        isLoading: false
    })
    const [isShowModal, setShowModal] = React.useState(false)
    const [deleteData] = useRemoveLectureMutation()
    const [deleteLecture] = usePostData(deleteData, settings, setSettings)

    const openModal = () => {
        setShowModal(true)
    }

    const trigger = async() => {
        setShowModal(false)
        await deleteLecture(lecture)
        dispatch(setLectures(null))
        navigate("/management/content")
    }
    
    return (
        <Card sx={{ maxWidth: 259,bgcolor:  theme.palette.background.alt}}>
            <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5050/${lecture.thumbnail}`}
                alt="no images"
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    title of lecture
                </Typography>
                <Typography variant="h5" component="div">
                    {lecture.partName}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                    Descitption
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {lecture.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" color='warning' onClick={() => editLecture(lecture)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="share" color='error' onClick={openModal}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <ModalControlled
                title={"r u sure to delete"}
                description={"it will be deleted permanently"}
                action={trigger}
                isShowModal={isShowModal}
                close={() => setShowModal(false)} />
        </Card>
    )
}
