import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddUserPage from '../user/actions/AddUserPage';
import { useTheme } from '@mui/material';
import { buttonError } from '../../styles/buttonsStyles';

export default function DialogControllled({ isOpen, setOpen, children, title, description }) {
    const theme = useTheme()

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle sx={{ bgcolor: theme.palette.background.alt }}>{title}</DialogTitle>

                <DialogContent sx={{ bgcolor: theme.palette.background.alt }}>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {children}
                </DialogContent>

                <DialogActions sx={{ bgcolor: theme.palette.background.alt }}>
                    <Button onClick={handleClose} sx={buttonError}>Cancel</Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}