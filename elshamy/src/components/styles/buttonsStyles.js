export const buttonStyle = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "6px 2px", backgroundColor: theme.palette.secondary[400], color: theme.palette.primary[500],
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
        m: "6px 2px",
        color: theme.palette.text.primary,
        bgcolor: theme.palette.error.main,
        "&:hover": {
            bgcolor: theme.palette.error.light,
        }
    }
}

export const sendSuccess = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "6px 2px", backgroundColor: theme.palette.success.main, color: theme.palette.grey[50],
        "&:hover": {
            backgroundColor: theme.palette.success.light,
        }
    }
}