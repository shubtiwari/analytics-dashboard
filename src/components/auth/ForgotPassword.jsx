import React from 'react';
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
import { forgotPasswordSchema } from '../../validations/authValidations';

const ForgotPassword = () => {
  const [status, setStatus] = React.useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Replace with actual API call
        console.log('Forgot password email:', values.email);
        setStatus({
          type: 'success',
          message: 'Password reset instructions have been sent to your email.',
        });
      } catch (error) {
        setStatus({
          type: 'error',
          message: error.message,
        });
      }
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
            Forgot Password
          </Typography>

          {status.message && (
            <Alert severity={status.type} sx={{ mt: 2, backgroundColor: '#d32f2f', color: 'white' }}>
              {status.message}
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
            >
              Reset Password
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link to="/login" style={{ color: 'white', fontWeight: 'bold' }}>
                Back to Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
