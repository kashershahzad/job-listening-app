'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Zod schema for form validation
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Type for form data
type SignUpFormData = z.infer<typeof signupSchema>;

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      console.log('User registered successfully', response.data);
      // Optionally, redirect to sign-in page after successful sign-up
      router.push('/pages/auth/signin');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="p-6">
      {/* Logo */}
      <Grid container>
        <Grid item>
          <Box
            component="img"
            alt="Widgets"
            src="\assests/logo.jpg"
            sx={{ height: 'auto', width: '100%', maxWidth: '100px' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        {/* Left Side: Title and Picture */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="\assests\sign-in.avif" // Replace with your image path
            alt="Welcome Image"
            className="w-full h-auto max-w-md"
          />
        </Grid>

        {/* Right Side: Sign-Up Form */}
        <Grid item xs={12} md={6} className="">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Typography variant="h4" align="center" gutterBottom className="text-lightblue font-bold">
              Register yourself
            </Typography>

            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('name')}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('email')}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12} sm={12}>
                <TextField
                  {...register('password')}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="mt-4"
            >
              Sign Up
            </Button>
            {/* Already have an account? Sign in */}
            <Typography variant="body2" align="center" className="mt-4">
              Already have an account?
              <Link href="/pages/auth/signin" passHref>
                <Typography component="a" color="primary" style={{ cursor: 'pointer' }}>
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpForm;
