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
import { loginSchema } from '../../validations/authValidations';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        console.log('Login values:', values);
        dispatch(loginSuccess({ email: values.email }));
      } catch (err) {
        dispatch(loginFailure(err.message));
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          backgroundImage: 'url(https://www.example.com/netflix-background.jpg)', // Background image
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for the card
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" color="white" align="center" fontWeight={600}>
            Sign In
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#e50914', // Netflix's red color
                '&:hover': { backgroundColor: '#b81d26' },
              }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Link to="/signup" style={{ color: 'white', fontWeight: 'bold' }}>
                Don't have an account? Sign Up
              </Link>
              <Link to="/forgot-password" style={{ color: 'white', fontWeight: 'bold' }}>
                Forgot password?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
