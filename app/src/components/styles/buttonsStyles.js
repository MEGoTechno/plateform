export const buttonStyle = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "10px 2px", backgroundColor: theme.palette.secondary[400], color: theme.palette.primary[500],
        "&:hover": {
            backgroundColor: theme.palette.secondary[500]
        }
    }
}

export const sendSuccess = (theme) => {
    return {
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
        margin: "10px 2px", backgroundColor: theme.palette.success.main, color: theme.palette.grey[50],
        "&:hover": {
            backgroundColor: theme.palette.success.light,
        }
    }
}