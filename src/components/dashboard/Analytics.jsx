import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';

const Analytics = () => {

    const instituteOptions = [
        { id: 1, title: 'THDC-IHET' },
        { id: 2, title: 'IIT Kanpur' },
        { id: 3, title: 'IIT Bombay' },
        { id: 4, title: 'IIT Delhi' },
    ];

    const annualYearOptions = [
        { id: 1, title: 'THDC-IHET' },
        { id: 2, title: 'IIT Kanpur' },
        { id: 3, title: 'IIT Bombay' },
        { id: 4, title: 'IIT Delhi' },
    ];


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: "100%" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 2,
                    marginRight: 2,
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                }}
            >
                <AutoCompleteComponent label={"Select Institute"} options={instituteOptions} />
                <AutoCompleteComponent label={"Select Annual Year"} options={annualYearOptions} />
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="body1">
                    Scrollable content here
                </Typography>
            </Box>
        </Box>
    );
};

export default Analytics;
