import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsControlled({ value, setValue, items, by }) {
    const theme = useTheme()
    const lang = useSelector(s =>s.global.lang)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabsStyle = {
        ".css-heg063-MuiTabs-flexContainer": {
            display: 'flex', justifyContent: "center"
        }
    }

    const tabStyle = {
        fontSize: "12px",
        fontWeight: 600,
        width: `calc(100% / ${items.length})`, // take care of it
    }
    return (
        <AppBar position="static" sx={{ bgcolor: theme.palette.background.alt, boxShadow: "none", width: "100%",  }} >
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                indicatorColor="secondary" 
                sx={tabsStyle}>
                {items && items.map((item, i) => {
                    return (
                        <Tab key={i} label={item[by]} {...a11yProps(i)} sx={tabStyle} />
                    )
                })}
            </Tabs>
        </AppBar>
    );
}