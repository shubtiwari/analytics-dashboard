import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';

const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box>
               <AutoCompleteComponent/>
            </Box>
        </Box>
    );
};

export default Dashboard;
