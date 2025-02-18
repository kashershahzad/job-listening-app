'use client'

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Avatar, Typography, Paper, Grid, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'; // Import the sign-out icon

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
        // Clear the user context or redirect to the login page
        setUser(null); // Assuming setUser is a function to clear the user context
        window.location.href = '/signin'; // Redirect to the login page
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Paper className="w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className="flex flex-col items-center">
            <Avatar
              sx={{ width: 150, height: 150 }}
              className="border-4 border-white shadow-lg"
            >
              {user?.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" className="mt-4 font-bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ExitToApp />} // Use the sign-out icon
              className="mt-4"
              onClick={handleSignOut} // Add the sign-out handler
            >
              Sign Out
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="font-bold mb-4">
              Profile Information
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="subtitle1" className="font-bold">
                  Name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </div>
              <div>
                <Typography variant="subtitle1" className="font-bold">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </div>
              <div>
                <Typography variant="subtitle1" className="font-bold">
                  User ID
                </Typography>
                <Typography variant="body1">{user.id}</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ProfilePage;