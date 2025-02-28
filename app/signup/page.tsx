'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

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
      router.push('/signin');
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
            src="assests/logo.png"
            sx={{ height: 'auto', width: '100%', maxWidth: '100px' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="\assests\sign-in.avif"
            alt="Welcome Image"
            className="w-full h-auto max-w-md"
          />
        </Grid>
        <Grid item xs={12} md={6} className="">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Typography variant="h4" align="center" gutterBottom className="text-lightblue font-bold">
              Register yourself
            </Typography>

            <Grid container spacing={2}>
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
            <Typography variant="body2" align="center" className="mt-4">
              Already have an account?
              <Link href="/signin" passHref>
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
