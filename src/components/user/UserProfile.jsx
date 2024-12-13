import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Avatar, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Edit as EditIcon } from '@mui/icons-material';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    officeBranch: Yup.string().required('Office branch is required'),
    avatar: Yup.mixed().nullable().required('Avatar image is required'),
});

const EditProfilePage = ({ user, onUpdate }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [avatar, setAvatar] = useState(null);

    const officeBranches = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setValue('avatar', file);
        }
    };

    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        try {
            const response = await onUpdate(data);
            console.log("🚀 ~ onSubmit ~ response:", response)
            if (response) {
                alert('Profile updated successfully');
            }
        } catch (error) {
            alert('Error updating profile');
        }
    };

    return (
        <Box sx={{ padding: 4, width:"50%" }}>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Avatar
                    alt="User Avatar"
                    src={avatar || user?.avatar}
                    sx={{ width: 100, height: 100, marginBottom: 2, marginLeft: 'auto', marginRight: 'auto' }}
                />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="avatar-upload">
                    <IconButton color="primary" component="span">
                        <EditIcon />
                    </IconButton>
                </label>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register('name')}
                />
                <FormControl fullWidth margin="normal" error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select {...register('gender')}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    {...register('phone')}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                />
                <FormControl fullWidth margin="normal" error={!!errors.officeBranch}>
                    <InputLabel>Office Branch</InputLabel>
                    <Select {...register('officeBranch')}>
                        {officeBranches.map((branch) => (
                            <MenuItem key={branch} value={branch}>
                                {branch}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" color="primary" variant="contained" sx={{ marginTop: 2 }}>
                    Update Profile
                </Button>
            </form>
        </Box>
    );
};

export default EditProfilePage;
