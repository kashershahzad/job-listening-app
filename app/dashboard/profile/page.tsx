'use client'

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Typography, Paper, Grid, Button, Divider } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();

  if (!user) {
    return <div>Loading........</div>;
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null); // Clear the user context
        window.location.href = '/signin'; // Redirect to the login page
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#fff', // White card background
          boxShadow: '0 8px 32px rgba(0, 123, 255, 0.2)', // Blue shadow
          display: 'flex',
        }}
      >
        {/* Left Side: Profile Overview */}
        <Grid
          container
          sx={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #007bff, #0056b3)', // Blue gradient
            color: '#fff',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {user.email}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ExitToApp />}
            sx={{
              backgroundColor: '#ffffff',
              color: '#007bff',
              '&:hover': {
                backgroundColor: '#e0e7ff',
              },
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Grid>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#90caf9' }} />

        {/* Right Side: Profile Details */}
        <Grid container sx={{ padding: '32px', background: '#fff' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, color: '#007bff' }}>
            Profile Details
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                User ID
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                {user.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                Name
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                Email
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                {user.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ProfilePage;
