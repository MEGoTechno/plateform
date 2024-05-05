import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalControlled from '../../../tools/ModalControlled';
import { useNavigate } from "react-router-dom"
import { useTheme } from '@mui/material';
import usePostData from '../../../../hooks/usePostData';
import { useDispatch, useSelector } from 'react-redux';
import { setLectures } from '../../../../toolkit/lecturesSlice';
import Loader from "../../../tools/Loader"
import LectureSettingsContent from '../../../molecules/LectureSettingsContent';
import { useRemoveLectureMutation } from '../../../../toolkit/apis/lecturesApi';

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
            <LectureSettingsContent thumbnail={thumbnail} lecture={lecture} lang={lang} />

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
