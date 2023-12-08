export const buttonStyle = (theme) => {
    return {
        width: "100%",
        fontWeight: "700",
        margin: "10px 2px", backgroundColor: theme.palette.secondary[400], color: theme.palette.primary[500],
        "&:hover": {
            backgroundColor: theme.palette.secondary[300]
        }
    }
}