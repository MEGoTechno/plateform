import { Box, Modal, Typography, useTheme } from '@mui/material'
import React from 'react'
import ButtonStyled from './ButtonStyled';
import { useSelector } from 'react-redux';

export default function ModalControlled({ title, description, action, isShowModal, close }) {

    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: theme.palette.background.alt,
        boxShadow: 24,
        p: 4,
        direction: lang.direction
    };

    if (isShowModal === undefined){
        return isShowModal = false
    }
    
    return (
        <Modal
            open={isShowModal}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
                <ButtonStyled title="submit" action={action} />
                <ButtonStyled title="cancel" action={close} />
            </Box>
        </Modal>
    )
}
