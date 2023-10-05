import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    background: theme.palette.primary[700], width: "100%"
}));

export default function ProductsPage() {


    return (
        <Box sx={{ display: "flex", alignItems: 'space-between', flexDirection: "column", gap: "20px" }}>
            <Item elevation={5}>
                {`elevation= test`}
            </Item>
            <Item elevation={5}>
                {`elevation= test`}
            </Item>
            <Item elevation={5}>
                {`elevation= test`}
            </Item>
            <Item elevation={5}>
                {`elevation= test`}
            </Item>
            <Item elevation={5}>
                {`elevation= test`}
            </Item>
            <Button sx={{ p: 0 }}>
                <Item elevation={5}>
                    {`elevation= test`}
                </Item>
            </Button>
        </Box>
    )
}
