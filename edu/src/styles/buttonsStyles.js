import { Button, styled } from "@mui/material"

export const buttonStyle = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: theme.palette.secondary.btnBg,
        color: theme.palette.text.btn,
        "&:hover": {
            backgroundColor: theme.palette.secondary[500]
        },
        "&.Mui-disabled": {
            // background: "initial",
            color: "initial",
            opacity: .7
        }
    }
}

export const buttonError = (theme) => {
    return {
        width: '100%',
        margin: "6px 2px",
        fontWeight: "600",
        color: theme.palette.grey[100],
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.light,
        }
    }
}

export const sendSuccess = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: theme.palette.success.main,
        color: theme.palette.grey[50],
        "&:hover": {
            backgroundColor: theme.palette.success.light,
        }
    }
}


export const StyledBtn = styled(Button)(({ theme }) => (buttonStyle(theme)))

export const ErrorBtn = styled(Button)(({ theme }) => (buttonError(theme)))

export const SuccessBtn = styled(Button)(({ theme }) => (sendSuccess(theme)))