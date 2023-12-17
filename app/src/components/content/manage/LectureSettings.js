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
import { useDispatch, useSelector } from 'react-redux';
import { setLectures } from '../../../toolkit/contentSlice';
import Loader from "../../tools/Loader"

export default function LectureSettings({ lecture, editLecture }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
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

    const trigger = async () => {
        setShowModal(false)
        setSettings({ isLoading: true })
        await deleteLecture(lecture)
        dispatch(setLectures(null))
        navigate("/management/content")
    }
    const thumbnail = lecture?.thumbnail?.url ? lecture?.thumbnail?.url : '/'

    return (
        <Card sx={{ bgcolor: theme.palette.background.alt }}>
            <CardMedia
                component="img"
                height={140}
                image={thumbnail}
                alt="no images"
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {lang.content.lectureName}
                </Typography>
                <Typography variant="h5" component="div">
                    {lecture.partName}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                    {lang.content.Description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {lecture.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>


                {settings.isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <IconButton aria-label="add to favorites" color='warning' onClick={() => editLecture(lecture)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="share" color='error' onClick={openModal}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}

            </CardActions>
            <ModalControlled
                title={lang.modal.delete}
                description={""}
                action={trigger}
                isShowModal={isShowModal}
                close={() => setShowModal(false)} />
        </Card>
    )
}
