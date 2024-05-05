import { Box, Button, Card, CardHeader, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Unit({ units, editUnit, showUnit, createUnit }) {
    const theme = useTheme()
    const { lang } = useSelector(s => s.global)
    
    return (
        <Box>
            {units && units.map((unit, i) => (
                <Box key={i} sx={{ width: "100%", }}>
                    <Card sx={{ width: "100%", mt: "10px", height: "auto", bgcolor: theme.palette.background.alt }}>
                        <CardHeader
                            action={
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.secondary[400],
                                            color: theme.palette.primary[500],
                                            fontWeight: 500,
                                            mb: "10px",
                                            "&:hover": {
                                                bgcolor: theme.palette.secondary[500]
                                            }
                                        }}
                                        onClick={() => editUnit(unit)}>
                                        {lang.content.editUnit}
                                    </Button>
                                    <Button
                                        sx={{
                                            width: "100%",
                                            bgcolor: theme.palette.secondary[400],
                                            color: theme.palette.primary[500],
                                            fontWeight: 500,
                                            "&:hover": {
                                                bgcolor: theme.palette.secondary[500]
                                            }
                                        }}
                                        onClick={() => showUnit(unit)}>
                                        {lang.content.show}
                                    </Button>
                                </Box>
                            }
                            title={unit.unitName}
                            subheader={unit.createdAt.split("T")[0]}
                        />
                    </Card>
                </Box>
            ))}

            <Button
                sx={{
                    bgcolor: theme.palette.success.main,
                    color: theme.palette.grey[50],
                    fontWeight: 500,
                    mt: "10px",
                    "&:hover": {
                        bgcolor: theme.palette.success.light
                    }
                }}
                onClick={createUnit}>{lang.content.addUnit}</Button>
        </Box>
    )
}
