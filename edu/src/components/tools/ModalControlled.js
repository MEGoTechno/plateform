import { Alert, Box, Modal, Typography, useTheme } from '@mui/material'
import React, { Children } from 'react'
import ButtonStyled from './ButtonStyled';
import { useSelector } from 'react-redux';

export default function ModalControlled(props) {

    let { title, description, action, isShowModal, close, children } = props

    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "7px",
        bgcolor: theme.palette.background.alt,
        boxShadow: 24,
        p: "20px 20px 10px 20px",
        direction: lang.direction,
    };

    if (isShowModal === undefined) {
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
                <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={700} fontSize={18} color= {theme.palette.secondary[300]}>
                    {title}
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    {children}
                </Box>
                <Box display={"flex"} justifyContent={"center"} gap={2}>
                    <ButtonStyled title={lang.modal.submit} action={action} />
                    <ButtonStyled title={lang.modal.cancel} severity={"error"} action={close} />
                </Box>
            </Box>
        </Modal>
    )
}
