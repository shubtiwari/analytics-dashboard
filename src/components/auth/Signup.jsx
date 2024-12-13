import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { signupSchema } from '../../validations/authValidations';

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      // TODO: Replace with actual API call
      console.log('Signup values:', values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          backgroundImage: 'url(https://www.example.com/netflix-background.jpg)',  // Netflix-style background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Dark background for the card
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" color="white" align="center" fontWeight={600}>
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, backgroundColor: '#d32f2f', color: 'white' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="filled"
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="filled"
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="filled"
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              variant="filled"
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#e50914',  // Netflix's red color
                '&:hover': { backgroundColor: '#b81d26' },
              }}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link to="/login" style={{ color: 'white', fontWeight: 'bold' }}>
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
