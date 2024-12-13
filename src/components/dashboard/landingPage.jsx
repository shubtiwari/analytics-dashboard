import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';

// Dummy API function to fetch user data
const fetchUserData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'John Doe',
                role: 'user',
                avatar: 'https://www.example.com/avatar.jpg', // Placeholder avatar
            });
        }, 100); // Simulated 1 second delay
    });
};

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(); // Replace with your actual API call
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getUserData();
    }, []);

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="white">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar user={user} handleNavigation={navigate} role={"user"} />
        </Box>
    );
};

export default UserDashboard;
